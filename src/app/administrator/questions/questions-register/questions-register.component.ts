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
    const staAux = this.statements.find(sta => sta.item == statement.item);
    if(staAux) {
      this.statements.splice(this.statements.indexOf(staAux), 1);  
    }
    this.statements.push(statement);
    this.statements.sort((x, y) => x.item < y.item ? -1 : 1);
  }

  editStatemet(statement: Statement) {
    this.formStatement.patchValue(statement);
    this.openDialog = true;
  }

  save() {
    this.statements.sort((x, y) => x.item < y.item ? -1 : 1);
    this.formQuestion.get('statements').setValue(this.statements);
    const question = new Question(this.formQuestion.getRawValue());
    this.questionService.save(question)
      .subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });
        this.formQuestion.reset();
        this.statements = [];
      });
  }
}
