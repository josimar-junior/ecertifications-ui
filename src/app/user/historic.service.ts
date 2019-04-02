import { Injectable } from "@angular/core";
import { CertificationHttp } from "../security/certification-http";
import { Historic } from "../model/historic.model";
import { Observable } from "rxjs";
import { API } from "../app.api";

@Injectable({
    providedIn: 'root'
  })
  export class HistoricService {
  
    constructor(private http: CertificationHttp) { }
  
    save(historic: Historic): Observable<any> {
      return this.http.post(`${API}/historic`, historic);
    }

    findAll(): Observable<Historic[]> {
      return this.http.get(`${API}/historic`);
    }
}