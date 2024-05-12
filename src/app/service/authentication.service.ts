import { Injectable } from "@angular/core";

@Injectable()
export class AuthtenticationService {
  constructor() {}

  getToken(): String {
    return 'token';
  }
}
