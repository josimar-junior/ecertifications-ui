import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';
import {ConfirmationService} from 'primeng/api';

import { Organization } from '../../model/organization.model';
import { OrganizationService } from './organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[] = [];

  formOrganization: FormGroup;

  status = [
    {label: 'Ativa', value: true},
    {label: 'Inativa', value: false}
  ];

  constructor(private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    this.buildFormOrganization();
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.organizationService.findAll().subscribe(organizations => this.organizations = organizations);
  }

  private buildFormOrganization() {
    this.formOrganization = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      active: [true, Validators.required]
    });
  }

  save() {
    const formValues = this.formOrganization.value;
    let org = undefined;

    if(formValues.id) {
      org = new Organization(formValues.name, formValues.active, formValues.id);
      this.organizationService.update(org).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Editado com sucesso!'});
        this.search();
        this.formOrganization.reset({
          active: true
        });
      });
    } else {
      org = new Organization(formValues.name, formValues.active);
      this.organizationService.save(org).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Sucesso', detail:'Salvo com sucesso!'});
        this.search();
        this.formOrganization.reset({
          active: true
        });
      });
    }
  }

  edit(organization: Organization) {
    this.formOrganization.patchValue(organization);
  }

  delete(organization: Organization) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir a organização ' + organization.name + '?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.organizationService.delete(organization.id).subscribe(res => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Removido com sucesso!'});
            this.search();
          });
      }
  });
  }
}
