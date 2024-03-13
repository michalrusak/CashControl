import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginData, RegisterData } from '../models/auth.model';
import { EndPoints } from 'src/enums/endPoints.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = `${environment.apiURL}/${EndPoints.auth}`;
  constructor(private http: HttpClient) {}

  login(body: LoginData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${EndPoints.login}`, body, {
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${EndPoints.logout}`, {
      withCredentials: true,
    });
  }

  register(body: RegisterData): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/${EndPoints.register}`, body);
  }

  autoLogin(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${EndPoints.autoLogin}`, {
      withCredentials: true,
    });
  }
}
