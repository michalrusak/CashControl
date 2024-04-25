import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoints } from 'src/enums/endPoints.enum';
import { environment } from 'src/environments/environment.development';
import { MessageResponse } from '../models/response.model';
import {
  AddTransaction,
  AllTransactionsResponse,
  DetailsTransaction,
  UpdateTransactionPayload,
} from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  apiURL = `${environment.apiURL}/${EndPoints.finance}/${EndPoints.transaction}`;
  constructor(private http: HttpClient) {}

  getTransaction(id_transaction: string): Observable<DetailsTransaction> {
    return this.http.get<DetailsTransaction>(
      `${this.apiURL}/${id_transaction}`,
      {
        withCredentials: true,
      }
    );
  }

  getAllTransactions(
    pageIndex: number,
    itemsPerPage: number
  ): Observable<AllTransactionsResponse> {
    let params = new HttpParams()
      .append('page', pageIndex)
      .append('limit', itemsPerPage);

    return this.http.get<AllTransactionsResponse>(`${this.apiURL}/`, {
      withCredentials: true,
      params,
    });
  }

  addTransaction(transaction: AddTransaction): Observable<AddTransaction> {
    return this.http.post<AddTransaction>(`${this.apiURL}/`, transaction, {
      withCredentials: true,
    });
  }

  updateTransaction(
    transaction: UpdateTransactionPayload
  ): Observable<UpdateTransactionPayload> {
    return this.http.patch<UpdateTransactionPayload>(
      `${this.apiURL}/`,
      transaction,
      {
        withCredentials: true,
      }
    );
  }

  deleteTransaction(id_transaction: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${this.apiURL}/${id_transaction}`,
      {
        withCredentials: true,
      }
    );
  }
}
