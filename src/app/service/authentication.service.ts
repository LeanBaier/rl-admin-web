import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthResponse, AuthenticationApi } from '../api/authentication.api';
import { constants } from '../enviroment';
import { SessionNotFoundError } from '../error-handler/authentication.error-handler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private authApi: AuthenticationApi, private router: Router) {}

  login(usuario: string, password: string) {
    return this.authApi
      .login({ username: usuario, password: password })
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((response) => {
        sessionStorage.setItem(
          constants.tokenKey,
          JSON.stringify({
            authResponse: response,
            expiresAt: new Date(
              Date.now() + (response.accessExpiresIn - 20) * 1000
            ),
          })
        );
        this.router.navigate(['/']);
      });
  }

  getAccessToken(): string {
    let session = sessionStorage.getItem(constants.tokenKey);

    if (session) {
      let sessionData: SessionData = JSON.parse(session);
      if (sessionData && sessionData.authResponse) {
        if (sessionData.expiresAt <= new Date()) {
          return this.refreshSession(sessionData.authResponse.refreshToken);
        }
        return sessionData.authResponse.accessToken;
      }
    }
    throw new SessionNotFoundError();
  }

  refreshSession(refreshToken: string): string {
    let accessToken: string = '';
    this.authApi
      .refreshToken({ refreshToken: refreshToken })
      .pipe(catchError((error) => throwError(() => error)))
      .subscribe((response) => {
        sessionStorage.setItem(
          constants.tokenKey,
          JSON.stringify({
            authResponse: response,
            expiresAt: new Date(
              Date.now() + (response.accessExpiresIn - 20) * 1000
            ),
          })
        );

        accessToken = response.accessToken;
      });

    return accessToken;
  }
}

interface SessionData {
  authResponse: AuthResponse;
  expiresAt: Date;
}
