import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm;
  validationErrors={
    'email':[
      {type:'required', message:'Email is required'},
      {type:'email',message:'Email invalid form'}
    ],
    'password':[
      {type:'required', message:'Password is required'},
      {type:'minLength',message:'Password must be at least 6 characters'}
    ]
  }


  constructor (private authService: AuthenticationService, private formBuilder:FormBuilder) {

  this.loginForm= this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.email
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])]
  });


}

  ngOnInit () {}


  login () {
   // console.log(this.loginForm.value)
   this.authService.login(this.loginForm.value)
  }
}
