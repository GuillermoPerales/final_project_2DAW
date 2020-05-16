import { Component, OnInit } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { Storage } from '@ionic/storage'
import { UsersService } from 'src/app/services/users.service'
import { Licenses } from 'src/app/interfaces/licenses'

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.page.html',
  styleUrls: ['./licenses.page.scss']
})
export class LicensesPage implements OnInit {
  constructor (private storage: Storage, private userService: UsersService) {}
  currentUser: Users
  resellers: [Users]
  resellerId: Number
  licenses:[Licenses]

  ngOnInit () {
    this.storage.get('user').then(val => {
      this.currentUser = val
      this.resellerId = val.reseller
      this.getResellers()
    })
  }
  getResellers () {
    this.userService.getAll(this.resellerId).subscribe(res => {
      this.resellers = res['data']
      console.log(this.resellers)
    })
  }

  changeUser (e) {
    console.log(e.detail.value)
    this.userService.getUserLicenses(e.detail.value).subscribe(res=>{
      this.licenses=res['data']
      console.log(this.licenses)
    })
  }
}
