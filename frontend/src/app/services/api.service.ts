import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

// import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) 
  {}

  private formatErrors (error: any) {
    return throwError(error.error)
  }

  get (path: string, params: HttpParams = new HttpParams()): Observable<any> {
    //console.log(`${environment.api_url}${path}`)
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors))
  }

  put (path: string, body: Object = {}): Observable<any> {
    //console.log(body,`${environment.api_url}${path}`)
    return this.http
      .put(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors))
  }

  post (path: string, body: Object = {}): Observable<any> {
    //console.log(`${environment.api_url}${path}`, body)
    return this.http
      .post(`${environment.api_url}${path}`, body)
      .pipe(catchError(this.formatErrors))
  }

  delete (path:string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors))
  }
}
