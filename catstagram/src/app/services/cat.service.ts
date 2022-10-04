import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cat } from '../models/Cat';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private catPath = environment.apiUrl + 'cats';

  constructor(private http : HttpClient, private authService: AuthService ) { }
  create(data: any) : Observable<Cat>{
     return this.http.post<Cat>(this.catPath, data)
  }

  getCats() : Observable<Array<Cat>>{
    return this.http.get<Array<Cat>>(this.catPath)
  }
  getCat(id: any): Observable<Cat>{
    return this.http.get<Cat>(this.catPath + '/' + id)
  }
  updateCat( data:any): Observable<Cat>{
    return this.http.put<Cat>(this.catPath, data);
  }
  deleteCat(id: any){
    return this.http.delete(this.catPath + '/' + id)
  }

}
