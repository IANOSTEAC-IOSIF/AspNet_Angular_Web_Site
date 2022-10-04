import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from './services/auth.service';
import{CatService} from './services/cat.service'
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CreatepostComponent } from './createpost/createpost.component'
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ListCatsComponent } from './list-cats/list-cats.component';
import { DetailsCatComponent } from './details-cat/details-cat.component';
import { ToastrModule } from 'ngx-toastr';
import { EditCatComponent } from './edit-cat/edit-cat.component';
import { ErrorInterceptorsService } from './services/error-interceptors.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreatepostComponent,
    ListCatsComponent,
    DetailsCatComponent,
    EditCatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [
     AuthService,
     CatService,
     AuthGuardService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
     },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorsService,
      multi: true
     }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
