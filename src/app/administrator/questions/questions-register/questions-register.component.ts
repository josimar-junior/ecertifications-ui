import { Component, OnInit } from '@angular/core';
import { Statement } from 'src/app/model/statement.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Certification } from 'src/app/model/certification.model';
import { CertificationFilter } from 'src/app/model/certification-filter.model';
import { CertificationService } from '../../certification/certification.service';
import { QuestionsService } from '../questions.service';
import { Question } from 'src/app/model/question.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-questions-register',
  templateUrl: './questions-register.component.html',
  styleUrls: ['./questions-register.component.css']
})
export class QuestionsRegisterComponent implements OnInit {

  openDialog: boolean;

  formStatement: FormGroup;
  formQuestion: FormGroup;

  statements: Statement[] = [];
  certifications: Certification[] = [];

  constructor(private formBuilder: FormBuilder,
              private certificationService: CertificationService,
              private questionService: QuestionsService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.buildFormQuestion();
    this.buildFormStatement();
  }

  buildFormStatement() {
    this.formStatement = this.formBuilder.group({
      id: [],
      item: [],
      description: [],
      correct: false
    });
  }

  buildFormQuestion() {
    this.formQuestion = this.formBuilder.group({
      id: [],
      certification: [],
      number: [],
      statementQuestion: [],
      statements: []
    });
  }

  openDialogStatement() {
    this.formStatement.reset();
    this.openDialog = true;
  }

  filterCertifications(name: string) {
    
    const filter = new CertificationFilter({
      name: name
    });
    this.certificationService.list(filter)
      .subscribe(certifications => {
        this.certifications = certifications
      });
  }

  addStatement() {
    const statement = new Statement(this.formStatement.value);
    this.statements.push(statement);
    console.log(this.statements);
  }

  editStatemet(statement: Statement) {
    this.formStatement.patchValue(statement);
    this.openDialog = true;
  }

  save() {
    this.formQuestion.get('statements').setValue(this.statements);
    console.log(this.formQuestion.getRawValue());
    const question = new Question(this.formQuestion.getRawValue());
    this.questionService.save(question)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });
        this.formQuestion.reset();
      });
  }
}
