import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QuestionsService } from 'src/app/administrator/questions/questions.service';
import { Question } from 'src/app/model/question.model';
import { Statement } from 'src/app/model/statement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Answer } from 'src/app/model/answer.model';
import { Historic } from 'src/app/model/historic.model';
import { Certification } from 'src/app/model/certification.model';
import { HistoricService } from '../historic.service';
import { ConfirmationService } from 'primeng/api';
import { UserResponse } from 'src/app/model/user-response.model';
import { UserResponseService } from '../user-response.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[] = [];
  certification: Certification;
  formQuiz: FormGroup;
  answers: Answer[] = [];

  init: boolean;

  time: Observable<number>;
  counter: number = 0;

  @ViewChild('timeRef') timeRef: ElementRef;

  openDialogResult: boolean;
  percentage: number;

  constructor(private questionService: QuestionsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private historicService: HistoricService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private userResponseService: UserResponseService) {
  }

  ngOnInit() {
    const idCertification = this.route.snapshot.params['id'];
    if (idCertification) {
      this.listQuestionsByIdCertification(idCertification);
    }
  }

  listQuestionsByIdCertification(idCertification: number) {
    this.questionService.listQuestionsByIdCertification(idCertification)
      .subscribe(questions => {
        this.questions = questions;
        if (this.questions)
          this.certification = this.questions[0].certification;
      });
  }

  hasMultipleChoice(statements: Statement[]): boolean {
    let count = 0;
    statements.forEach(sta => {
      if (sta.correct)
        count++;
    });
    return count >= 2;
  }

  clickRadio(numberQuestion, item) {

    let answer = this.answers.find(answer => answer.question === numberQuestion);

    if (answer) {
      this.answers.splice(this.answers.indexOf(answer), 1);
    }
    answer = new Answer();
    answer.question = numberQuestion;
    answer.items.push(item);
    this.answers.push(answer);
  }

  clickCheckbox(numberQuestion, item, event) {

    let answer = this.answers.find(answer => answer.question === numberQuestion);

    if (answer) {
      if (event) {
        this.answers.splice(this.answers.indexOf(answer), 1);
        answer.items.push(item);
        answer.items.sort((x, y) => x < y ? -1 : 1);
        this.answers.push(answer);
      } else {
        answer.items.splice(answer.items.indexOf(item), 1);
      }
      if (answer.items.length == 0) {
        this.answers.splice(this.answers.indexOf(answer), 1);
      }
    } else {
      answer = new Answer();
      answer.question = numberQuestion;
      answer.items.push(item);
      answer.items.sort((x, y) => x < y ? -1 : 1);
      this.answers.push(answer);
    }
  }

  finalize() {

    let count: number = 0;
    let answersAux: Answer[] = Object.assign([], this.answers);
    for (const que of this.questions) {
      const corrects: Statement[] = que.statements.filter(cor => cor.correct);
      for (const ans of answersAux) {
        if (que.number === ans.question) {
          const correctItems: string[] = corrects.map(cor => cor.item);
          if (JSON.stringify(correctItems) === JSON.stringify(ans.items)) {
            count++;
            answersAux.splice(answersAux.indexOf(ans), 1);
            break;
          }
        }
      }
    }
    const numberQuestions = this.questions.length;
    this.percentage = (count * 100) / numberQuestions;
    const time = this.timeRef.nativeElement.innerText.substring(7);
    let historic: Historic = new Historic(this.certification, time, this.percentage);

    let usersResponse: UserResponse[] = [];

    this.answers.forEach(ans => {
      const items: string = ans.items.toString();
      let userResponse: UserResponse = new UserResponse();
      userResponse.certification = this.certification;
      userResponse.questionNumber = ans.question;
      userResponse.items = items;
      usersResponse.push(userResponse);
    });
    
    this.historicService.save(historic)
      .subscribe(his => {
        usersResponse.forEach(user => user.historic = his);
        this.userResponseService.save(usersResponse).subscribe(() => {
          this.openDialogResult = true;
        });
      });
  }

  get approved(): boolean {
    return this.percentage >= this.certification.percentage;
  }

  initTest() {
    this.time = timer(0, 1000)
      .pipe(map(() => ++this.counter));
  }

  finalizeTest() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja finalizar o teste?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.finalize();
      }
    });
  }

  historic() {
    this.router.navigate(['/user/historic']);
  }
}
