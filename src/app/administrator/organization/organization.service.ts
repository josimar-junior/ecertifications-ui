import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organization } from '../../model/organization.model';
import { API } from '../../app.api';
import { CertificationHttp } from 'src/app/security/certification-http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: CertificationHttp) { }

  findAll(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${API}/organizations`);
  }

  save(organization: Organization): Observable<any> {
    return this.http.post(`${API}/organizations`, organization);
  }

  update(organization: Organization): Observable<any> {
    return this.http.put(`${API}/organizations/${organization.id}`, organization);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API}/organizations/${id}`, httpOptions);
  }
}
