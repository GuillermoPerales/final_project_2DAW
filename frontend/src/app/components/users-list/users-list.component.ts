import { Component, OnInit, Input } from '@angular/core';
import { Users } from 'src/app/interfaces';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
@Input() resellers:[Users];

  constructor() { }

  ngOnInit() {}

}
