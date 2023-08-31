import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from './../../../environments/environment';
import { DetailResponse, ListResponse, Response, SendCoinsPayload, TransactionHistory } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  addCard(data: any) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/buy/card/create`, data);
  }

  getCardList() {
    return this.http.get<DetailResponse>(`${APP_CONFIG.apiUrl}/buy/card/list`)
  }

  removeCard(data: any) {
    return this.http.delete<Response>(`${APP_CONFIG.apiUrl}/buy/card/remove`, {
      body:data
    });
  }

  getEncryptionKey() {
    return this.http.get<DetailResponse>(`${APP_CONFIG.apiUrl}/buy/encryptionKey`)
  }

  calculateAmount(data:any) {
    return this.http.post<any>(`${APP_CONFIG.apiUrl}/buy/initiate`,data)
  }

  getClientIpAddress() {
    return this.http.get<any>("https://jsonip.com")
  }
  
  getCountryList() {
    return this.http.get<any>(`${APP_CONFIG.apiUrl}/miscellaneous/getCountries`)
  }

  getDistrictList(countryCode : String) {
    return this.http.get<any>(`${APP_CONFIG.apiUrl}/miscellaneous/getDistricts?countryCode=${countryCode}`)
  }

}
