import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MenuPage } from './menu.page'

const routes: Routes = [
  {
    path: '',
    component: MenuPage,

    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then(m => m.UsersPageModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'licenses',
        loadChildren: () =>
          import('../licenses/licenses.module').then(
            m => m.LicensesPageModule
          )
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPageRoutingModule {}
