import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationApi {
  private apiUrl = environment.apiAuthenticationUrl;

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/v1/auth/login`, authRequest);
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/v1/auth/refreshToken`, refreshTokenRequest);
  }

  register(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/v1/auth/register`, authRequest);
  }
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  accessExpiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
}
