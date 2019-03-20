import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/administrator/questions/questions.service';
import { Question } from 'src/app/model/question.model';
import { Statement } from 'src/app/model/statement.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Answer } from 'src/app/model/answer.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[] = [];
  certficationName: string;
  formQuiz: FormGroup;
  answers: Answer[] = [];

  constructor(private questionService: QuestionsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.buildFormQuiz();
  }

  ngOnInit() {
    const idCertification = this.route.snapshot.params['id'];
    if (idCertification) {
      this.listQuestionsByIdCertification(idCertification);
    }
  }

  buildFormQuiz() {
    this.formQuiz = this.formBuilder.group({
      questao: [],
      itens: []
    });
  }

  listQuestionsByIdCertification(idCertification: number) {
    this.questionService.listQuestionsByIdCertification(idCertification)
      .subscribe(questions => {
        this.questions = questions;
        if (this.questions)
          this.certficationName = this.questions[0].certification.name;
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

    if(answer) {
      this.answers.splice(this.answers.indexOf(answer), 1);
    }
    answer = new Answer();
    answer.question = numberQuestion;
    answer.items.push(item);
    this.answers.push(answer);
    console.log(numberQuestion + ' - ' + item);
  }

  clickCheckbox(numberQuestion, item, event) {
    
    let answer = this.answers.find(answer => answer.question === numberQuestion);

    if(answer) {
      if(event) {
        this.answers.splice(this.answers.indexOf(answer), 1);
        answer.items.push(item);
        this.answers.push(answer);
      } else {
        answer.items.splice(answer.items.indexOf(item), 1);
      }
      if(answer.items.length == 0) {
        this.answers.splice(this.answers.indexOf(answer), 1);
      }
    } else {
      answer = new Answer();
      answer.question = numberQuestion;  
      answer.items.push(item);
      this.answers.push(answer);
    }
    
    console.log(numberQuestion + ' - ' + item + ' - ' + event);
  }

  finalizar() {
    console.log(this.answers);
  }
}
