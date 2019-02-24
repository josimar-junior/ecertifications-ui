import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Certification } from '../../model/certification.model';
import { API } from '../../app.api';
import { CertificationFilter } from 'src/app/model/certification-filter.model';
import { Detail } from 'src/app/model/detail.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private httpClient: HttpClient) { }

  save(certification: Certification): Observable<any> {
    return this.httpClient.post(`${API}/certifications`, certification);
  }

  update(certification: Certification): Observable<any> {
    return this.httpClient.put(`${API}/certifications/${certification.id}`, certification);
  }

  list(filter: CertificationFilter): Observable<Certification[]> {
    
    let params = new HttpParams();
    if(filter.name) {
      params = params.append('name', filter.name);
    }
    if(filter.exam) {
      params = params.append('exam', filter.exam);
    }
    params = params.append('idOrganization', String(filter.idOrganization));

    return this.httpClient.get<Certification[]>(`${API}/certifications`, {params});
  }

  findById(id: number): Observable<Certification> {
    return this.httpClient.get<Certification>(`${API}/certifications/${id}`);
  }

  searchDetails(idCertification: number): Observable<Detail[]> {
    return this.httpClient.get<Detail[]>(`${API}/certifications/${idCertification}/details`);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API}/certifications/${id}`, httpOptions);
  }
}
