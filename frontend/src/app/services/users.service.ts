import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Users } from '../interfaces/users'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor (private apiService: ApiService) {}

  getAll (): Observable<[Users]> {
    return this.apiService.get('/users').pipe(
      map(data => {
        return data
            })
    )
  }
}
