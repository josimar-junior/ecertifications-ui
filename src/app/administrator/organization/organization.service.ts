import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from '../../model/organization.model';
import { API } from '../../app.api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(`${API}/organizations`);
  }

  save(organization: Organization): Observable<any> {
    return this.httpClient.post(`${API}/organizations`, organization);
  }

  update(organization: Organization): Observable<any> {
    return this.httpClient.put(`${API}/organizations/${organization.id}`, organization);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API}/organizations/${id}`, httpOptions);
  }
}
