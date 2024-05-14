import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationErrorHandler implements ErrorHandler {
  constructor(private router: Router, private ngZone: NgZone) {
  }

  handleError(error: any) {
    console.log(error);
    if (error instanceof SessionNotFoundError) {
      console.log('Redirect to login...')
      this.ngZone.run(() => {
        this.router.navigate(['/login']).then(r => console.log(r))
      })
    }
  }
}

export class SessionNotFoundError extends Error {
  constructor() {
    super('Session not found');
  }
}
