import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { UsersPageRoutingModule } from './users-routing.module'

import { UsersPage } from './users.page'
import { UsersListComponent } from 'src/app/components/users-list/users-list.component'
import { UsersAdminComponent } from 'src/app/components/users-admin/users-admin.component'
import { PermissionsAdminComponent } from 'src/app/components/permissions-admin/permissions-admin.component'
import { DragulaModule } from 'ng2-dragula'
@NgModule({
  imports: [CommonModule, FormsModule,ReactiveFormsModule, IonicModule, UsersPageRoutingModule,DragulaModule],
  declarations: [UsersPage, UsersListComponent,UsersAdminComponent,PermissionsAdminComponent],
  entryComponents:[UsersAdminComponent,PermissionsAdminComponent]
})
export class UsersPageModule {}
