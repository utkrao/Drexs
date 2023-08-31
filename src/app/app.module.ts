import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './core/services/intercepter'
import { ErrorHandlerInterceptor } from './core/services/error-handler.interceptor'


import { NgSelectModule } from '@ng-select/ng-select';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [AppComponent, SplashScreenComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FontAwesomeModule,
    Ng2FlatpickrModule,
    ToastrModule.forRoot({ autoDismiss: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
   },

   {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true
  }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
