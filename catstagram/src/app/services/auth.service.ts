import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { ToastrService} from 'ngx-toastr';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginPath = environment.apiUrl + 'identity/login'
  private registerPath = environment.apiUrl +'identity/register';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any>{
    return this.http.post(this.loginPath, data);
  }
  register(data: any): Observable<any>{
    return this.http.post(this.registerPath, data);
  }
  saveToken(token: any){
    console.log('he was cros over here');
    localStorage.setItem('token', token)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  deleteToken(){
    return localStorage.removeItem('token')


  }
   isAuthenticated(){
    if(this.getToken()){
        return true;
    }
    return false;
   }
}
