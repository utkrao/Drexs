import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    // private socket: Socket
    ) { }

  sendData(data: Object) {
    // this.socket.emit('energy-consumption-data', data);
  }

  getData() {
    // return this.socket.fromEvent('energy-consumption-data').pipe(map((data:any) => data.msg));
  }

}
