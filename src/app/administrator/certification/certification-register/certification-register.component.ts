import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService, ConfirmationService } from 'primeng/api';

import { OrganizationService } from '../../organization/organization.service';
import { Organization } from '../../../model/organization.model';
import { Detail } from '../../../model/detail.model';
import { CertificationService } from '../certification.service';
import { Certification } from '../../../model/certification.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certification-register',
  templateUrl: './certification-register.component.html',
  styleUrls: ['./certification-register.component.css']
})
export class CertificationRegisterComponent implements OnInit {

  organizations: Organization[] = [];

  details: Detail[] = [];

  formCertification: FormGroup;

  constructor(private organizationService: OrganizationService,
    private formBuilder: FormBuilder,
    private certificationService: CertificationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute) {
    this.buildFormCertification();
  }

  ngOnInit() {

    this.organizationService.findAll().subscribe(organizations => this.organizations = organizations)

    const idCertification = this.route.snapshot.params['id'];

    if (idCertification) {
      this.certificationService.findById(idCertification).subscribe(certification => {
        this.details = certification.details;
        this.formCertification.patchValue(certification);
      });
    }
  }

  buildFormCertification() {
    this.formCertification = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      exam: [null, Validators.required],
      organization: [null, Validators.required],
      description: [],
      details: []
    });
  }

  get disableAddButton() {
    return !this.formCertification.get('description').value;
  }

  addDetail() {
    const detail = new Detail();
    detail.description = this.formCertification.get('description').value;
    this.details.push(detail);
    this.formCertification.get('description').setValue(null);
  }

  delete(detail: Detail) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este detalhe?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.details.splice(this.details.indexOf(detail), 1);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Removido com sucesso!' });
      }
    });
  }

  save() {
    debugger
    this.formCertification.get('details').setValue(this.details);

    const certification = new Certification(this.formCertification.value);
    
    delete certification.description;

    if (certification.id) {

      this.certificationService.update(certification).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Atualizado com sucesso!' });

        this.formCertification.reset();
        this.details = [];
      });
    } else {
      this.certificationService.save(certification).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });

        this.formCertification.reset();
        this.details = [];
      });

    }

  }

}
