import {Injectable} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {AuthenticationApi, AuthResponse} from '../api/authentication.api';
import {constants} from '../enviroment';
import {SessionNotFoundError} from '../error-handler/authentication.error-handler';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  interval: any;

  constructor(private authApi: AuthenticationApi, private router: Router) {
  }

  login(usuario: string, password: string) {
    return this.authApi
      .login({email: usuario, password: password})
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((response) => {
        this.saveSession(response);
        this.router.navigate(['/']);
        this.interval = setSessionTimeoutInterval(this.refreshSession, response.accessExpiresIn);
      });
  }

  getAccessToken(): string {
    if (this.interval == null) {
      this.refreshSession();
    }
    let session = sessionStorage.getItem(constants.tokenKey);
    if (session) {
      let sessionData: SessionData = JSON.parse(session);
      return sessionData.authResponse.accessToken;
    }

    throw new SessionNotFoundError();
  }

  refreshSession() {
    let session = sessionStorage.getItem(constants.tokenKey);
    if (session) {
      let sessionData: SessionData = JSON.parse(session);
      if (sessionData?.authResponse) {
        console.log("Refresh session");
        this.authApi
          .refreshToken({refreshToken: sessionData.authResponse.refreshToken})
          .subscribe((response) => {
            this.saveSession(response)
            clearInterval(this.interval);
            this.interval = setSessionTimeoutInterval(this.refreshSession, response.accessExpiresIn);
          });
      }
      return;
    }

    throw new SessionNotFoundError();
  }

  saveSession(response: AuthResponse) {
    sessionStorage.setItem(
      constants.tokenKey,
      JSON.stringify({
        authResponse: response,
        expiresAt: new Date(
          Date.now() + ((response.accessExpiresIn - 30) * 1000)
        ),
      })
    );
  }
}

function setSessionTimeoutInterval(method: () => void, timeout: number){
  return setInterval(method, (timeout - 30) * 1000);
}


interface SessionData {
  authResponse: AuthResponse;
  expiresAt: Date;
}

