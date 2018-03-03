import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AuthServiceService,AuthorizationGuardService,LoginResolveService,UserDataService} from './services/index';
import { TokenInterceptorService , ErrorinterceptorService } from './interceptors/index';
import { NavigationComponent } from './navigation/navigation.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthorizationGuardService,
    AuthServiceService,
    TokenInterceptorService,
    LoginResolveService,
    UserDataService,
      [{
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      },{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorinterceptorService,
        multi: true
    }],
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
