import { Component } from '@angular/core'
import { Platform, NavController } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AuthenticationService } from './services/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor (
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private navCtrl: NavController
  ) {
    this.initializeApp()
 
  }


  initializeApp () {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      this.authService.checkToken()
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.navCtrl.navigateRoot(['menu'])
        } else {
          this.navCtrl.navigateRoot(['login'])
        }
      })
      this.checkDarkTheme()
    })
  }
checkDarkTheme(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  if(prefersDark.matches){
    document.body.classList.toggle('dark')
  }  
}
}
