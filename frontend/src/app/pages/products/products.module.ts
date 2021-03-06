import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ProductsListComponent } from 'src/app/components/products-list/products-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductsDetailsComponent } from 'src/app/components/products-details/products-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ProductsPage,ProductsListComponent,ProductsDetailsComponent],entryComponents:[ProductsDetailsComponent]
})
export class ProductsPageModule {}
