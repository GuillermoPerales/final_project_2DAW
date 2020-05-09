import { Component, OnInit } from '@angular/core'
import { Users } from '../../interfaces/users'
import { UsersService } from 'src/app/services/users.service'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  constructor (
    private userService: UsersService,
    private authService: AuthenticationService,
    private storage: Storage
  ) {}

  resellers: [Users]

  currentUser: Users
  resellerId

  ngOnInit () {
    this.storage.get('user').then(val => {
      this.currentUser = val
      this.resellerId=val.reseller
      this.getResellers()
    })
  
  }
  getResellers(){
    this.userService.getAll(this.currentUser.reseller).subscribe(res => {
      this.resellers = res['data']
    })
  }

}
