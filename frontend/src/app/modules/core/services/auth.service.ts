import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, RegisterData } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = `${environment.apiURL}/auth`;
  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, body, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/logout`, {
      withCredentials: true,
    });
  }

  register(body: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register`, body);
  }

  autoLogin(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/auto-login`, {
      withCredentials: true,
    });
  }
}
