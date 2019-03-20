import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';
import { API } from '../app.api';
import { CertificationHttp } from './certification-http';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: CertificationHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${API}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.cleanAccessToken();
      });
  }

}