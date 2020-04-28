import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { Products } from '../interfaces/products'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor (private apiService: ApiService) {}

  getAll (): Observable<[Products]> {
    return this.apiService.get('/products')
  }
}
