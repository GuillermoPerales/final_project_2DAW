import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Storage } from '@ionic/storage'
import { Platform } from '@ionic/angular'
import { ApiService } from './api.service'
import { map, tap } from 'rxjs/operators'
import { AlertService } from './alert.service'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

const TOKEN_KEY = 'auth-token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token

  authenticationState = new BehaviorSubject(false)

  constructor (
    private storage: Storage,
    private platform: Platform,
    private apiService: ApiService,
    private alertService: AlertService,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.checkToken()
    })
  }

  login (data) {
    // return this.apiService.post('/auth/login', data).subscribe(
    //   token => {
    //     this.storage.set(TOKEN_KEY, token).then(
    //       () => {
    //         this.alertService.presentToast('Logged In', 'success')
    //         console.log('Token Stored')
    //       },
    //       error => console.error('Error storing item', error)
    //     )
    //     this.token = token
    //     this.authenticationState.next(true)
    //     return token
    //   },
    //   error => {
    //     this.alertService.presentToast('Error: ' + error.message, 'danger')
    //   }
    // )

    return this.storage.set(TOKEN_KEY, 'Guillermo').then(res=>{
      this.authenticationState.next(true);
    });
  }

  logout () {
    this.alertService.presentToast('Logged out', 'primary')
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false)
    })
  }

  isAuthenticated () {
    return this.authenticationState.value
  }

  checkToken () {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.token = res
        this.authenticationState.next(true)
      } else {
        delete this.token
        this.authenticationState.next(false)
        return false
      }
    })
  }

  user () {
    if (this.checkToken()) {
      const headers = new HttpHeaders({
        Authorization:
          this.token['token_type'] + ' ' + this.token['access_token']
      })
      return this.http
        .get(environment.api_url + '/auth/user', { headers: headers })
        .subscribe(user => {
          console.log(user)
          return user
        })
    }
  }
}
