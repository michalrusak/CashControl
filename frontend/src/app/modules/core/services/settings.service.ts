import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/enums/endPoints.enum';
import { environment } from 'src/environments/environment.development';
import { UpdateUserPayload, ChangePasswordPayload } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  apiURL = `${environment.apiURL}/${EndPoints.user}`;
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/`, {
      withCredentials: true,
    });
  }

  updateUser(body: UpdateUserPayload): Observable<any> {
    return this.http.patch<UpdateUserPayload>(`${this.apiURL}/`, body, {
      withCredentials: true,
    });
  }

  changePassword(body: ChangePasswordPayload): Observable<any> {
    return this.http.post<ChangePasswordPayload>(`${this.apiURL}/`, body, {
      withCredentials: true,
    });
  }

  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/`, {
      withCredentials: true,
    });
  }
}
