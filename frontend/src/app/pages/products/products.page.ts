import { Component, OnInit } from '@angular/core'
import { ProductsService } from 'src/app/services/products.service'
import { Products } from '../../interfaces/products'

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {
  public products: [Products]

  constructor (private porductsService: ProductsService) {}

  ngOnInit () {
    this.porductsService.getAll().subscribe(res => {
      console.log(res)
      this.products = res['data']
    })
  
  }
}
