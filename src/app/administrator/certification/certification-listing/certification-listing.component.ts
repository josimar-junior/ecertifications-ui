import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/model/organization.model';
import { OrganizationService } from '../../organization/organization.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CertificationFilter } from 'src/app/model/certification-filter.model';
import { CertificationService } from '../certification.service';
import { Certification } from 'src/app/model/certification.model';
import { Detail } from 'src/app/model/detail.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-certification-listing',
  templateUrl: './certification-listing.component.html',
  styleUrls: ['./certification-listing.component.css']
})
export class CertificationListingComponent implements OnInit {

  organizations: Organization[];
  certifications: Certification[];
  details: Detail[];
  formFilter: FormGroup;

  openDialogDetails: boolean;
  examDialog: string;

  constructor(private organizationService: OrganizationService,
    private certificationService: CertificationService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

    this.buildFormFilter();
  }

  ngOnInit() {
    this.organizationService.findAll().subscribe(organizations => this.organizations = organizations);
  }

  buildFormFilter() {
    this.formFilter = this.formBuilder.group({
      name: [],
      exam: [],
      organization: []
    });
  }

  search() {

    if (!this.formFilter.get('organization').value)
      this.formFilter.get('organization').setValue(this.organizations[0]);


    const filter = new CertificationFilter({
      name: this.formFilter.get('name').value,
      exam: this.formFilter.get('exam').value,
      idOrganization: this.formFilter.get('organization').value.id
    });

    this.certificationService.list(filter).subscribe(certifications => {
      this.certifications = certifications;
    });
  }

  searchDetails(certification: Certification) {
    this.certificationService.searchDetails(certification.id)
      .subscribe(details => {
        this.details = details;
        this.examDialog = certification.exam;
        this.openDialogDetails = true;
      });
  }

  delete(certification: Certification) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta certificação?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.certificationService.delete(certification.id).subscribe(res => {
          this.search();
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Removido com sucesso!' });
        });
      }
    });
  }
}
