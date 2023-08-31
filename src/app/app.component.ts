import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { StorageService } from './core/services';
import { PowerManagementService } from './core/services/power-management.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // showSplashScreen: boolean = false;
  deviceInfo = null;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private storage: StorageService,
    private electron: ElectronService,
    private deviceService: DeviceDetectorService,
    private powerManagementService: PowerManagementService,
    private router: Router,
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    // setTimeout(() => {
    //   this.showSplashScreen = false;
    // }, 3000);
  }
  
public ngOnInit() {

  this.deviceInfo = this.deviceService.getDeviceInfo();

  this.electron.ipcRenderer.on('logout-app', () => {
    this.logout();
  })

  this.electron.ipcRenderer.on('power-calculation', (event, power) => {
    console.log('power-calculation :power: ', power);
    const data = {
      "power":power,
      "device":this.deviceInfo.device,
      "os": this.deviceInfo.os,
      "timeStamp":Date.now().toString()
    }   
    if (this.storage.get('logged')) {
      this.powerManagementService.addPowerData(data).subscribe({
        next: (response) => {
          console.log("==> Success response: ", response);
        },
        error: (e) => {
          console.log("==> Error e: ", e);
        }
      })
    }
  })
  
  if (this.storage.get('logged')) {
    this.router.navigate(['/pages/dashboard'], { state: { fromLogin: false } });
  }
}


  public logout():void {     
    this.storage.remove('logged');
    this.storage.remove('sessionId');
    this.storage.remove('token');    
    this.storage.remove('navigation');      
    this.router.navigate(['/auth/login']);
  }

}
