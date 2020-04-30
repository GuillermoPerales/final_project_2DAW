import { Component, OnInit, Input, AfterViewChecked } from '@angular/core'
import { Products } from 'src/app/interfaces/products'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  
  @Input() products: [Products]

  constructor () {}

  ngOnInit () {}


}
