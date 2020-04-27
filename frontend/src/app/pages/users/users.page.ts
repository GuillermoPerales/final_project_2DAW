import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router'
import { Users } from '../../interfaces/users'
import { UsersService } from 'src/app/services/users.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  constructor (
    private menuController: MenuController,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  users = [];

  ngOnInit () {
    // this.apiService.get('/users').subscribe(data => {
    //   console.log(data)
    //   this.users = data
    // })
    // this.route.data.subscribe(
    //   (data: {users:[Users]}) => {
    //     this.users = data.users;
    //     console.log(data)

    //   }
    // );
  }

  openMenu () {
    this.menuController.toggle()
  }
}
