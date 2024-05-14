import {ErrorHandler, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationErrorHandler implements ErrorHandler {
  constructor(private router: Router) {
  }

  handleError(error: any) {
    console.log(error);
    if (error instanceof SessionNotFoundError) {
      console.log('Redirect to login...')
      this.router.navigate(['/login']).then(r => console.log(r));
    }
  }
}

export class SessionNotFoundError extends Error {
  constructor() {
    super('Session not found');
  }
}
