import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Users } from '../interfaces/users'
import { map } from 'rxjs/operators'
import { AuthenticationService } from './authentication.service'
import { Roles } from '../interfaces/roles'
import { Licenses } from '../interfaces/licenses'

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
  getAllRoles():Observable<[Roles]>{
    return this.apiService.get('/roles').pipe(map(data=>{
      console.log(data)
      return data
    }))
  }
  getUserLicenses(id):Observable<[Licenses]>{
    return this.apiService.get('/users/'+id+'/licenses').pipe(map(data=>{
      console.log(data)
      return data
    }))
  }
}
