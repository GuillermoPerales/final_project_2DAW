import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable, from, of } from 'rxjs'
import { Users } from '../interfaces/users'
import { map, switchMap } from 'rxjs/operators'
import { AuthenticationService } from './authentication.service'
import { Roles } from '../interfaces/roles'
import { Licenses } from '../interfaces/licenses'
import { Storage } from '@ionic/storage'
import { AlertService } from './alert.service'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (
    private apiService: ApiService,
    private authService: AuthenticationService,
    private storage: Storage,
    private alertService:AlertService
  ) {}

  getAll (reseller): Observable<[Users]> {
    return this.apiService.get('/resellers/' + reseller).pipe(
      map(data => {
        return data
      })
    )
  }
  getAllRoles (): Observable<[Roles]> {
    return this.apiService.get('/roles').pipe(
      map(data => {
        console.log(data)
        return data
      })
    )
  }
  getUserLicenses (id): Observable<[Licenses]> {
    return this.apiService.get('/users/' + id + '/licenses').pipe(
      map(data => {
        console.log(data)
        return data
      })
    )
  }
  getAllPermissions (user) {
    return this.apiService.get('/users/' + user + '/permissions').pipe(
      map(data => {
        return data
      })
    )
  }


  getGuardPermissions (permission) {
    return from(this.storage.get('user'))
      .pipe(
        switchMap(user =>this.getAllPermissions(user.id)),
        map(userPermissions =>this.searchPermission(userPermissions.data, permission))
        )      
  }

  searchPermission (permissions, permission) {
    console.log(permissions)
    let res = false
    permissions.forEach(element => {
      console.log(element.permission_name)
      if (
        element.permission_name == permission ||
        element.permission_name == 'admin'
      ) {        
        res = true
      }
    })
    console.log(res)
    if(!res){this.alertService.presentToast("You don't have permission!!","warning")}
    return res
  }
}
