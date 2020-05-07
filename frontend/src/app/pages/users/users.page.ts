import { Component, OnInit } from '@angular/core'
import { Users } from '../../interfaces/users'
import { UsersService } from 'src/app/services/users.service'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit{
  constructor (
    private userService: UsersService,
    private authService: AuthenticationService,
  ) {}

  resellers: [Users];

  currentUser: Users;

  ngOnInit () {

      this.userService.getAll('1').subscribe(res => {
        this.resellers = res['data']
        console.log(this.resellers)
      })
  
  }

 
}
