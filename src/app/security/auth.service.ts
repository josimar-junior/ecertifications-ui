
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { API } from '../app.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenUrl = `${API}/oauth/token`;
    this.getToken();
  }

  login(email: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy');

    const body = `username=${email}&password=${password}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response.access_token);
      })
      .catch(response => {
        console.log('Erro -> ', response);
        if (response.status === 400) {
          if (response.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  getNewAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/x-www-form-urlencoded')
        .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response.access_token);

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Error: ', response);
        return Promise.resolve(null);
      });
  }

  cleanAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  hasPermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  haveAnyPermission(roles) {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }

    return false;
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private getToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }
}
