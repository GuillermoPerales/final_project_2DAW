import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicensesPageRoutingModule } from './licenses-routing.module';

import { LicensesPage } from './licenses.page';
import { LicensesListComponent } from 'src/app/components/licenses-list/licenses-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [LicensesPage,LicensesListComponent],entryComponents:[]
})
export class LicensesPageModule {}
