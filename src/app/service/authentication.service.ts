import {Injectable} from '@angular/core';
import {catchError, throwError} from 'rxjs';
import {AuthenticationApi, AuthResponse} from '../api/authentication.api';
import {changeTimezone, constants} from '../enviroment';
import {SessionNotFoundError} from '../error-handler/authentication.error-handler';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private authApi: AuthenticationApi, private router: Router) {
  }

  login(usuario: string, password: string) {
    return this.authApi
      .login({email: usuario, password: password})
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((response) => {
        this.saveSession(response);
        this.router.navigate(['/']);
      });
  }

  getAccessToken(): string {
    this.refreshSession();
    let session = sessionStorage.getItem(constants.tokenKey);
    console.log(session);
    if (session) {
      let sessionData: SessionData = JSON.parse(session);
      console.log(sessionData);
      return sessionData.authResponse.accessToken;
    }

    throw new SessionNotFoundError();
  }

  refreshSession() {
    let session = sessionStorage.getItem(constants.tokenKey);
    console.log(session);
    if (session) {
      let sessionData: SessionData = JSON.parse(session);
      console.log(sessionData);
      if (sessionData?.authResponse) {
        if (sessionData.expiresAt <= new Date()) {
          this.authApi
            .refreshToken({refreshToken: sessionData.authResponse.refreshToken})
            .pipe(catchError((error) => throwError(() => error)))
            .subscribe((response) => this.saveSession(response));
        }
      }
      return;
    }

    throw new SessionNotFoundError();
  }

  saveSession(response
                :
                AuthResponse
  ) {
    sessionStorage.setItem(
      constants.tokenKey,
      JSON.stringify({
        authResponse: response,
        expiresAt: changeTimezone(new Date(
          Date.now() + (response.accessExpiresIn - 20) * 1000
        )),
      })
    );
  }
}


interface SessionData {
  authResponse: AuthResponse;
  expiresAt: Date;
}

