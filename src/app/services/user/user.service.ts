import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { AuthRequest } from 'src/app/interfaces/user/auth/auth-request';
import { AuthResponse } from 'src/app/interfaces/user/auth/auth-response';
import { UserSignupRequest } from '../../interfaces/user/user-signup-request';
import { UserSignupResponse } from '../../interfaces/user/user-signup-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  userSignUp(payload: UserSignupRequest): Observable<UserSignupResponse> {
    return this.http.post<UserSignupResponse>(`${this.API_URL}/user`, payload);
  }

  authUser(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, payload);
  }

  isLoggedIn(): boolean {
    const jwtToken = this.cookie.get('USER_INFO');
    return jwtToken ? true : false;
  }
}
