import { Injectable } from '@angular/core';
import { CertificationHttp } from '../security/certification-http';
import { UserResponse } from '../model/user-response.model';
import { API } from '../app.api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserResponseService {
  
    constructor(private http: CertificationHttp) { }
  
    save(usersResponse: UserResponse[]) {
      return this.http.post(`${API}/user-response`, usersResponse);
    }

    listAllByCertification(idHistoric: number, idCertification: number): Observable<UserResponse[]> {
      return this.http.get(`${API}/user-response/${idHistoric}/certification/${idCertification}`);
    }
}