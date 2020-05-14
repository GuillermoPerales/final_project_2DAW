import { Component, OnInit, Input } from '@angular/core'
import { Products } from 'src/app/interfaces/products'
import { ModalController } from '@ionic/angular'
import { ProductsDetailsComponent } from '../products-details/products-details.component'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  
  @Input() products: [Products]

  constructor (private modalController:ModalController) {}

  ngOnInit () {}


  async productModal (product) {
    const modal = await this.modalController.create({
      component: ProductsDetailsComponent,
      componentProps: {
        product: product
      },
      showBackdrop: true
    })
    await modal.present()
  
  }
}
