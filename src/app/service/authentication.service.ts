import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() {
  }

  getToken(): string {
    return 'token';
  }
}
