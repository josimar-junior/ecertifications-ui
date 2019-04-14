import { Injectable } from "@angular/core";
import { CertificationHttp } from "../security/certification-http";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { API } from "../app.api";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: CertificationHttp,
                private httpCliente: HttpClient) { }

    save(user: User): Observable<any> {
        return this.httpCliente.post<any>(`${API}/users`, user);
    }
}
