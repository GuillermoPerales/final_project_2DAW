import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Storage } from '@ionic/storage'
import { Platform } from '@ionic/angular'
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

const TOKEN_KEY = 'auth-token'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false)
 

  constructor (private storage: Storage, private platform: Platform, private apiService:ApiService) {
    this.platform.ready().then(()=>{
      this.checkToken();
    })
  }

  login (data) {
    return this.apiService.post('/auth/login', data).subscribe(res=>
      {
        let token=res.access_token
        this.storage.set(TOKEN_KEY, token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        )      
        this.authenticationState.next(true);       
        return token;
        }
    );

    // return this.storage.set(TOKEN_KEY, 'Guillermo').then(res=>{
    //   this.authenticationState.next(true);
    // });
  }

  logout () {
    return this.storage.remove(TOKEN_KEY).then(()=>{
      this.authenticationState.next(false);
    });
  }

  isAuthenticated () {
    return this.authenticationState.value;
  }

  checkToken () {
    return this.storage.get(TOKEN_KEY).then(res=>{
      if (res){
        this.authenticationState.next(true);
      }
    });
  }
}
