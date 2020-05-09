import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

import { UsersPageRoutingModule } from './users-routing.module'

import { UsersPage } from './users.page'
import { UsersListComponent } from 'src/app/components/users-list/users-list.component'
import { UsersAdminComponent } from 'src/app/components/users-admin/users-admin.component'


@NgModule({
  imports: [CommonModule, FormsModule,ReactiveFormsModule, IonicModule, UsersPageRoutingModule],
  declarations: [UsersPage, UsersListComponent,UsersAdminComponent],
  entryComponents:[UsersAdminComponent]
})
export class UsersPageModule {}
