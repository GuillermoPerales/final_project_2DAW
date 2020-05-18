import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MenuPage } from './menu.page'
import { AdminUsersGuard } from 'src/app/guards/admin-users.guard'
import { LicensesGuardGuard } from 'src/app/guards/licenses-guard.guard'

const routes: Routes = [
  {
    path: '',
    component: MenuPage,

    children: [
      {
        path: 'users',
        canActivate:[AdminUsersGuard],
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
        canActivate:[LicensesGuardGuard],
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
