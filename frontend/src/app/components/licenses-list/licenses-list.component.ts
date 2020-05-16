import { Component, OnInit, Input } from '@angular/core';
import { Licenses } from 'src/app/interfaces/licenses'

@Component({
  selector: 'app-licenses-list',
  templateUrl: './licenses-list.component.html',
  styleUrls: ['./licenses-list.component.scss'],
})


export class LicensesListComponent implements OnInit {
  @Input() licenses: [Licenses]
  constructor() { }

  ngOnInit() {}

}
