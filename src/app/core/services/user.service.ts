import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment'
import { SignupRequest, SignupResponse, BeneficiaryListPayload, GetAssetResponse, ListResponse, BeneficialListing } from '../interfaces';
import { Response, DetailResponse } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  sendOtp(data: { email?: string; phone?: string }) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/otp`, { ...data });
  }

  signup(data: SignupRequest) {
    Object.keys(data).forEach(key => {
      if (data[key] === null) {
        delete data[key];
      }
    });
    return this.http.post<SignupResponse>(`${APP_CONFIG.apiUrl}/auth/register`, data);
  }

  verifyOtp(data: { email?: string; phone?: string; }, otp: number) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/otp/verify`, { ...data, otp });
  }

  userExist(data: { email?: string; phone?: string }) {
    return this.http.post<DetailResponse>(`${APP_CONFIG.apiUrl}/auth/exists`, { ...data });
  }
  

  login(data: { email?: string; phone?: string; password: string; id:string, walletType:string}) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/login`, data);
  }

  resetPassword(data: { email: string, password: string }) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/resetPassword`, data);
  }

  changePassword(data: { userId: string, oldPassword: string, newPassword: string }) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/changePassword`, data);
  }

  restoreWallet(data: { BTC: string }, userType:string) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/auth/restore`, { publicKeys: { ...data },userType });
  }

  getWalletBalance() {
    return this.http.get<GetAssetResponse>(`${APP_CONFIG.apiUrl}/user/balance`);
  }

  getTrasactionHistory(page: number, limit: number) {
    return this.http.get<Response>(`${APP_CONFIG.apiUrl}/user/transactions?limit=${limit}&page=${page}`);
  }

  addBeneficiary(data: BeneficiaryListPayload) {
    return this.http.post<ListResponse<any>>(`${APP_CONFIG.apiUrl}/user/beneficiary/add`, data);
  }

  getBeneficiaryList(data: { coinCode: string; search: string; sort: string; }) {
    return this.http.get<any>(`${APP_CONFIG.apiUrl}/user/beneficiary/list?coinCode=${data.coinCode}&search=${data.search}&sort=${data.sort}`);
  }

  removeUser(data: { coinCode: string; address: string }) {
    return this.http.delete(`${APP_CONFIG.apiUrl}/user/beneficiary/remove`, { body: data });
  }

  getSuggestion(data: { coinCode: string; address: string }) {
    return this.http.post<ListResponse<any>>(`${APP_CONFIG.apiUrl}/user/beneficiary/user`, data);
  }

  updateProfile(data: { email?: string; name?: string }) {
    return this.http.post<Response>(`${APP_CONFIG.apiUrl}/user/profile`, data);
  }
}
