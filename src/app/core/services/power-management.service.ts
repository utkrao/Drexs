import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../../../environments/environment'
import { PowerDataPayload } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PowerManagementService {
  constructor(private http: HttpClient) { }

  addPowerData(data: PowerDataPayload) {
    return this.http.post<any>(`${APP_CONFIG.apiUrl}/power/fetch`, data);
  }

  getPowerData(params={}) {
    return this.http.get<any>(`${APP_CONFIG.apiUrl}/power?limit=50&page=1`, params);
  }
}
