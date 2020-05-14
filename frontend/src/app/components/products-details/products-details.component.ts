import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/interfaces/products';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  @Input()product:Products

  constructor() { }

  ngOnInit() {}

}
