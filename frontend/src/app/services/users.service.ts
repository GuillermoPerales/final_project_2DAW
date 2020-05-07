import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Users } from '../interfaces/users'
import { map } from 'rxjs/operators'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (private apiService: ApiService,private authService: AuthenticationService,) {}

  getAll (reseller): Observable<[Users]> {  
    return this.apiService.get('/resellers/'+reseller).pipe(
      map(data => {
        return data
            })
    )
  }
}
