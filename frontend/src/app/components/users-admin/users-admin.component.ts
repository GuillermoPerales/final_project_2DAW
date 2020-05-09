import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/interfaces';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
})
export class UsersAdminComponent implements OnInit {
@Input() user:Users
  constructor() { }

  ngOnInit() {
    console.log(this.user)
  }

}
