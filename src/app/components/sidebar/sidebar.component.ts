import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserType } from '../../core/interfaces';
import { StorageService } from '../../core/services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  activeUrl : string ;
  walletType: string ;

  masterNodeMenu = [
    {
      name: 'Dashboard',
      url: '/pages/dashboard',
      active: true,
      icon : "Dashboard.svg",
      child: [],
    },
    {
      name: 'Marketplace',
      url: '/pages/marketplace',
      active: false,
      icon : "Marketplace.svg",    
      child: [],
    },
    // {
    //   name: 'Certificate Wallet',
    //   url: '/pages/certificate-wallet',
    //   active: false,
    //   icon : "M6 7V4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3H13.414L15.414 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V16C22 16.2652 21.8946 16.5196 21.7071 16.7071C21.5196 16.8946 21.2652 17 21 17H18V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H6ZM6 9H4V19H16V17H6V9Z",
    //   child: [
    //     {
    //       name: 'Minted',
    //       url: '/pages/certificate-wallet/minted',
    //       active: false,
    //       child: [],
    //     },
    //     {
    //       name: 'Staking Activities',
    //       url: '/pages/certificate-wallet/stacking-activities',
    //       active: false,
    //       child: [],
    //     },
    //     {
    //       name: 'Staking History',
    //       url: '/pages/certificate-wallet/stacking-history',
    //       active: false,
    //       child: [],
    //     }
    //   ],
    // },
  
  
    {
      name: 'Certificates',
      url: '/pages/certificates',
      active: false,
      icon : "Certificates.svg",
      child: [
        // {
        //   name: 'My Certificates',
        //   url: '/pages/certificates/my-certificates',
        //   active: false,
        //   child: [],
        // },
        // {
        //   name: 'My Drecs',
        //   url: '/pages/certificates/my-drecs',
        //   active: false,
        //   child: [],
        // },
        // {
        //   name: 'Staked Drecs',
        //   url: '/pages/certificates/stacked-drecs',
        //   active: false,
        //   child: [],
        // }
      ],
    },

    {
      name: 'Transaction History',
      url: '/pages/transaction-history',
      active: false,
      icon : "Transcation-History.svg",
      child: [],
    },

    // {
    //   name: 'Masternode',
    //   url: '/pages/masternode',
    //   active: false,
    //   icon : "M15.874 12.9979C15.6516 13.8562 15.1504 14.6163 14.4493 15.1589C13.7481 15.7015 12.8866 15.9959 12 15.9959C11.1134 15.9959 10.2519 15.7015 9.55074 15.1589C8.84957 14.6163 8.34844 13.8562 8.126 12.9979H3V10.9979H8.126C8.34844 10.1397 8.84957 9.37962 9.55074 8.83702C10.2519 8.29441 11.1134 8 12 8C12.8866 8 13.7481 8.29441 14.4493 8.83702C15.1504 9.37962 15.6516 10.1397 15.874 10.9979H21V12.9979H15.874V12.9979Z",
    //   child: [],
    // },
    {
      name: 'My Wallet',
      url: '/pages/my-wallet',
      active: false,
      icon : "My-Wallet.svg",
      child: [
        // {
        //   name: 'Transaction History',
        //   url: '/pages/my-wallet/transaction-history',
        //   child: [],
        // }
      ],
    }
  ]

  userNodeMenu = [
    {
      name: 'Home',
      url: '/pages/user-node/home',
      active: true,
      icon : "M3.79 6.828c-1 .78-1.79 2.38-1.79 3.64v6.9c0 2.55 2.07 4.63 4.62 4.63H17.4c2.55 0 4.62-2.07 4.62-4.62v-6.78c0-1.35-.87-3.01-1.97-3.78l-5.76-4.03c-1.57-1.1-3.98-1.04-5.49.13l-5.01 3.91Zm5.93-2.726L4.714 8.01c-.28.218-.598.614-.847 1.12-.25.507-.366.994-.366 1.338v6.9a3.13 3.13 0 0 0 3.12 3.13H17.4a3.122 3.122 0 0 0 3.12-3.12v-6.78c0-.378-.13-.892-.402-1.414-.272-.521-.62-.922-.928-1.137l-5.76-4.03c-1.03-.723-2.719-.681-3.71.085Zm4.54 13.896a2.255 2.255 0 0 1-2.25 2.25 2.255 2.255 0 0 1-2.25-2.25v-3a2.255 2.255 0 0 1 2.25-2.25 2.255 2.255 0 0 1 2.25 2.25v3Zm-2.25.75c.41 0 .75-.34.75-.75v-3c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3c0 .41.34.75.75.75Z",
      child: [],
    },
    {
      name: 'Marketplace',
      url: '/pages/marketplace',
      active: false,
      icon : "M2 9H21C21.2652 9 21.5196 9.10536 21.7071 9.29289C21.8946 9.48043 22 9.73478 22 10V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V9ZM3 3H18V7H2V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3V3ZM15 14V16H18V14H15Z",    
      child: [],
    },
    {
      name: 'My Wallet',
      url: '/pages/my-wallet',
      active: false,
      icon : "M6.91 2.11c-1.68.137-2.622.532-3.497 1.468-.718.767-1.056 1.557-1.249 2.92-.063.447-.078 1.212-.095 4.848-.025 5.312.013 6.069.364 7.166.466 1.46 1.858 2.777 3.332 3.151.945.24 1.102.248 5.743.268 4.409.02 5.337-.003 6.196-.153 1.134-.198 1.954-.632 2.744-1.453.983-1.022 1.317-1.885 1.449-3.75.081-1.147.03-6.505-.067-7.172-.182-1.238-.561-2.074-1.311-2.898-.272-.299-.916-.812-1.171-.934l-.144-.069-.053-.755c-.065-.922-.19-1.376-.494-1.788-.353-.479-.864-.746-1.633-.852-.44-.06-9.364-.059-10.114.003Zm9.475 1.347c.713.047.945.1 1.1.256.132.131.237.49.28.951l.031.344-.227-.031a57.414 57.414 0 0 0-.624-.079c-.588-.071-7.585-.108-8.916-.046-2.19.1-3.093.38-4.152 1.285-.138.117-.26.205-.27.194-.046-.046.19-.827.347-1.147.129-.261.267-.444.549-.724.742-.737 1.412-.936 3.364-1.002 1.453-.048 7.79-.05 8.518-.001Zm.777 2.864c.89.132 1.303.289 1.87.712.525.392.998 1.008 1.183 1.54.086.247.231.847.231.954 0 .023-1.21.048-2.812.057-2.513.013-2.842.024-3.089.097-1.14.336-2.002 1.204-2.287 2.303a3.22 3.22 0 0 0 1.724 3.712c.653.313.698.317 3.797.318h2.771l-.031.456c-.107 1.519-.351 2.157-1.123 2.93-.637.636-1.106.872-2.051 1.03-1.264.21-9.315.21-10.677 0-.89-.138-1.456-.416-2.046-1.003-.636-.634-.893-1.16-1.064-2.175-.068-.407-.078-.9-.078-3.828 0-2.989.009-3.419.082-3.881.099-.623.22-1.017.432-1.394.39-.701 1.183-1.386 1.857-1.606.906-.296 1.498-.324 6.52-.31 3.684.01 4.342.022 4.791.088Zm3.393 5.43c.017.427.031 1.247.031 1.82v1.043h-2.77c-2.274 0-2.81-.012-2.992-.067-.49-.147-.975-.604-1.166-1.098-.314-.813.03-1.777.798-2.226.41-.24.448-.244 3.357-.247l2.712-.003.03.778Zm-5.408.392c-.183.053-.37.254-.439.473-.1.31.069.654.402.825.07.036.563.053 1.517.053 1.254 0 1.434-.01 1.578-.082a.679.679 0 0 0-.001-1.214c-.2-.102-.242-.105-1.56-.1-.746.002-1.42.022-1.497.045Z",
      child: [
        {
          name: 'My Assets',
          url: '/pages/my-wallet',
          child: [],
        },
        {
          name: 'My Collectibles',
          url: '/pages/user-node/my-collectibles',
          child: [],
        },
        {
          name: 'Staking Activity',
          url: '/pages/user-node/staking-activities',
          child: [],
        },
        {
          name: 'Staking History',
          url: '/pages/user-node/stacking-history',
          child: [],
        },
        {
          name: 'Transaction History',
          url: '/pages/my-wallet/transaction-history',
          child: [],
        }
      ],
    },

    {
      name: 'dApps',
      url: '/pages/user-node/dapps',
      active: false,
      icon : "M6 2.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM1.25 6a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0Zm12.97-3.78c.69-.69 1.664-.97 2.78-.97h2c1.116 0 2.09.28 2.78.97s.97 1.664.97 2.78v2c0 1.116-.28 2.09-.97 2.78s-1.664.97-2.78.97h-2c-1.116 0-2.09-.28-2.78-.97s-.97-1.664-.97-2.78V5c0-1.116.28-2.09.97-2.78Zm1.06 1.06c-.31.31-.53.836-.53 1.72v2c0 .884.22 1.41.53 1.72.31.31.836.53 1.72.53h2c.884 0 1.41-.22 1.72-.53.31-.31.53-.836.53-1.72V5c0-.884-.22-1.41-.53-1.72-.31-.31-.836-.53-1.72-.53h-2c-.884 0-1.41.22-1.72.53ZM2.22 14.22c.69-.69 1.664-.97 2.78-.97h2c1.116 0 2.09.28 2.78.97s.97 1.664.97 2.78v2c0 1.116-.28 2.09-.97 2.78s-1.664.97-2.78.97H5c-1.116 0-2.09-.28-2.78-.97s-.97-1.664-.97-2.78v-2c0-1.116.28-2.09.97-2.78Zm1.06 1.06c-.31.31-.53.836-.53 1.72v2c0 .884.22 1.41.53 1.72.31.31.836.53 1.72.53h2c.884 0 1.41-.22 1.72-.53.31-.31.53-.836.53-1.72v-2c0-.884-.22-1.41-.53-1.72-.31-.31-.836-.53-1.72-.53H5c-.884 0-1.41.22-1.72.53ZM18 14.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM13.25 18a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0Z",
      child: [],
    },
    
  ]

  sidebarMenu = [];

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.activeUrl = event.url;
      
      let activeUrlTerms = this.activeUrl.split('/')
      console.log("activeUrlTerms: ",activeUrlTerms);

      this.sidebarMenu.forEach(ele=>{

        console.log("activeUrlTerms: ",activeUrlTerms);

        ele.active = activeUrlTerms[2] == ele.url.split('/')[2] 
      });

    });

   }

  ngOnInit(): void { 

    const walletType = this.storage.get('wallet-type');
   
    this.walletType = walletType;
    if (walletType === UserType.userwallet) {
      this.sidebarMenu = this.userNodeMenu;
    } else {
      this.sidebarMenu = this.masterNodeMenu;
    }

    if(this.storage.get('navigation')) {
      const {url, index } = this.storage.get('navigation');
      if(url && index ){
        this.navigate(url, index);
      }
    }
        
  }

  navigate(url, index) {
    this.sidebarMenu = this.sidebarMenu.map((item, ind) => {
      if (ind === index) {
        return { ...item, active: true };
      } else {
        return { ...item, active: false };
      }
    });
    this.router.navigate([`/${url}`]);
    this.storage.set('navigation', {url: url, index: index});

  }


  goToHomePage(){
    if(this.sidebarMenu.length>0){
      this.navigate(this.sidebarMenu[0].url, 0)
    }
  }

}
