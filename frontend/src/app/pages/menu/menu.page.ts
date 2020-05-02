import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Users',
      url: '/menu/users'
    },
    {
      title: 'Products',
      url: '/menu/products'
    }
  ]

  selectedPath = ''

  constructor (
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    })
  }

  ngOnInit () {}

  logout () {
    this.authService.logout()
  }
}
