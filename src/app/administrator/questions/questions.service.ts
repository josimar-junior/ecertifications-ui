import { Injectable } from '@angular/core';
import { CertificationHttp } from 'src/app/security/certification-http';
import { Question } from 'src/app/model/question.model';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: CertificationHttp) { }

  save(question: Question): Observable<any> {
    return this.http.post(`${API}/questions`, question);
  }

  listQuestionsByIdCertification(idCertification: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${API}/questions/certification/${idCertification}`);
  }
}
