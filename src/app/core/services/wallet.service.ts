import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from './../../../environments/environment';
import { DetailResponse, GetFiatValuePayload, ListResponse, Response, SendCoinsPayload, TransactionHistory } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient
  ) { }

  sendCoins(data: SendCoinsPayload) {
    return this.http.post<DetailResponse>(`${APP_CONFIG.apiUrl}/user/send`, data);
  }

  getTransactionHistory(limit: number, page: number) {
    return this.http.get<ListResponse<any>>(`${APP_CONFIG.apiUrl}/user/transactions?limit=${limit}&page=${page}`)
  }

  getCoinFiatValue(data: GetFiatValuePayload) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/buy/initiate`, data);
  }

  coinBuyPayment(data: any) {
    return this.http.post<DetailResponse>(`${APP_CONFIG.apiUrl}/buy/payment`, data);
  }

  coinSwapInitiate(data: any) {
    return this.http.post<DetailResponse>(`${APP_CONFIG.apiUrl}/swap/initiate`, data);
  }

  coinSwapConfirm(data: any) {
    return this.http.post<DetailResponse>(`${APP_CONFIG.apiUrl}/swap/confirm`, data);
  }


  getStakingHistory(limit: number, page: number) {
    return this.http.get<ListResponse<any>>(`${APP_CONFIG.apiUrl}/user/staking-history?limit=${limit}&page=${page}`)
  }


  getStakingActivity(limit: number, page: number) {
    return this.http.get<ListResponse<any>>(`${APP_CONFIG.apiUrl}/user/staking-activity?limit=${limit}&page=${page}`)
  }


}
