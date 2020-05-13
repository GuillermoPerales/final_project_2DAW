import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { Storage } from '@ionic/storage'
import { ApiService } from './api.service'
import { map, tap } from 'rxjs/operators'
import { AlertService } from './alert.service'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Users } from '../interfaces/users'

const TOKEN_KEY = 'auth-token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token
  private currentUser: Users
  authenticationState = new BehaviorSubject(false)

  constructor (
    private storage: Storage,
    private apiService: ApiService,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  login (data) {
    return this.apiService.post('/auth/login', data).pipe(
      tap(
        token => {
          this.storage.set(TOKEN_KEY, token).then(
            () => {
              this.alertService.presentToast('Logged In', 'success')
              console.log('Token Stored')
            },
            error => console.error('Error storing item', error)
          )
          this.token = token
          this.authenticationState.next(true)
          return token
        },
        error => {
          this.alertService.presentToast('Error: ' + error.message, 'danger')
        }
      )
    )
  }

  logout () {
    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] + ' ' + this.token['access_token']
    })
    return this.http
      .get<Users>(environment.api_url + '/auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove(TOKEN_KEY)
          this.storage.remove('user')
          this.authenticationState.next(false)
          delete this.token
          delete this.currentUser
          this.alertService.presentToast('Logged out', 'primary')
          return data
        })
      )
  }

  isAuthenticated () {
    return this.authenticationState.value
  }

  checkToken () {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.token = res
        // this.getUser()
        this.authenticationState.next(true)
      } else {
        delete this.token
        this.authenticationState.next(false)
        return false
      }
    })
  }

  getUser () {
    const headers = new HttpHeaders({
      Authorization: this.token['token_type'] + ' ' + this.token['access_token']
    })
    return this.http
      .get<Users>(environment.api_url + '/auth/user', { headers: headers })
      .pipe(
        tap(
          user => {
            this.storage.set('user', user)
            return user
          },
          error => {
            console.error(error)
          }
        )
      )
  }

  register (data) {
    return this.apiService.post('/auth/register', data)
  }
  updateUser (id, data) {
    console.log(id, data)
    return this.apiService.put('/users/' + id, data)
  }
}
