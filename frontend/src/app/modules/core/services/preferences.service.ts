import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/enums/endPoints.enum';
import { RouterEnum } from 'src/enums/router.enum';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  apiURL = `${environment.apiURL}/${EndPoints.finance}`;
  constructor(private http: HttpClient) {}

  getDefaultCurrencies(): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}/${EndPoints.getDefaultCurrency}`,
      {
        withCredentials: true,
      }
    );
  }

  getDefaultIncomeCategories(): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}/${EndPoints.getDefaultIncomeCategories}`,
      {
        withCredentials: true,
      }
    );
  }

  getDefaultExpenseCategories(): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}/${EndPoints.getDefaultExpenseCategories}`,
      {
        withCredentials: true,
      }
    );
  }

  adduserPreferences(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}/${EndPoints.userPreferences}`,
      body,
      {
        withCredentials: true,
      }
    );
  }
}
