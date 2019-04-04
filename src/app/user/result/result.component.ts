import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/administrator/questions/questions.service';
import { Question } from 'src/app/model/question.model';
import { Certification } from 'src/app/model/certification.model';
import { Statement } from 'src/app/model/statement.model';
import { UserResponse } from 'src/app/model/user-response.model';
import { UserResponseService } from '../user-response.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  questions: Question[] = [];
  userResponses: UserResponse[] = [];
  certification: Certification;

  formResult: FormGroup;

  constructor(private router: ActivatedRoute,
    private questionService: QuestionsService,
    private userResponseService: UserResponseService,
    private fb: FormBuilder) { }

  ngOnInit() {
    const idHistoric = this.router.snapshot.params['id'];
    const idCertification = this.router.snapshot.params['idCertification'];
    
    if (idHistoric && idCertification) {
      this.listQuestionsByIdCertification(idCertification);
      this.listAnswers(idHistoric, idCertification);
    }
  }

  buildFormResult() {
    this.formResult = this.fb.group({
      result: []
    });
  }

  listQuestionsByIdCertification(idCertification: number) {
    this.questionService.listQuestionsByIdCertification(idCertification)
      .subscribe(questions => {
        this.questions = questions;
        if (this.questions)
          this.certification = this.questions[0].certification;
      });
  }

  listAnswers(idHistoric: number, idCertification: number) {
    this.userResponseService.listAllByCertification(idHistoric, idCertification)
      .subscribe(res => {
        this.userResponses = res;
      });
  }

  getAnswer(questionNumber: string): string {
      if (this.userResponses.length > 0) {
        const res: UserResponse = this.userResponses.find(res => res.questionNumber == questionNumber);
        return res.items;
      }
  }

  hasMultipleChoice(statements: Statement[], questionNumber?: string): boolean {
    this.buildFormResult();
    if (this.userResponses.length > 0) {
      let count = 0;
      statements.forEach(sta => {
        if (sta.correct)
          count++;
      });
      this.formResult.get('result').setValue(this.getAnswer(questionNumber));
      return count >= 2;
    }
  }

}
