import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { UserSignupRequest } from '../../interfaces/user/user-signup-request';
import { Observable } from 'rxjs';
import { UserSignupResponse } from '../../interfaces/user/user-signup-response';
import { AuthRequest } from 'src/app/interfaces/user/auth/auth-request';
import { AuthResponse } from 'src/app/interfaces/user/auth/auth-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  userSignUp(payload: UserSignupRequest): Observable<UserSignupResponse> {
    return this.http.post<UserSignupResponse>(`${this.API_URL}/user`, payload);
  }

  authUser(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, payload);
  }
}
