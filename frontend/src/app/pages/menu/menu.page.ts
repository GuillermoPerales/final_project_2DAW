import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Users } from 'src/app/interfaces'
import { Storage } from '@ionic/storage'

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
    },
    {
      title: 'Licenses',
      url:'/menu/licenses'
    }
  ]

  selectedPath = ''
  darkTheme: boolean = false
  currentUser: Users

  constructor (
    private router: Router,
    private authService: AuthenticationService,
    private storage: Storage
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url
    })
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkTheme=prefersDark.matches;
  }

  ngOnInit () {
    this.authService.checkToken().then(() => {
      this.authService.getUser().subscribe(res => {
        this.currentUser = res
        console.log(res)
      })
    })
  }

  logout () {
    this.authService.logout().subscribe(res => {
      delete this.currentUser
    })
  }

  changeDarkTheme(){
    this.darkTheme=!this.darkTheme
    document.body.classList.toggle('dark')
  }
}
