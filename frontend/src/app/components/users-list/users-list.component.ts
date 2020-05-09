import { Component, OnInit, Input } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { ModalController } from '@ionic/angular'
import { UsersAdminComponent } from '../users-admin/users-admin.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() resellers: [Users]
  @Input() resellerId

  newUserForm
  validationErrors = {
    name: [{ type: 'required', message: 'Email is required' }],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Email invalid form' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be at least 6 characters' }
    ]
  }

  constructor (
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.newUserForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ],
        password_confirmation: ['', Validators.required]
      },
      { validators: this.password.bind(this) }
    )
  }

  ngOnInit () {}

  password (newUserForm: FormGroup) {
    const { value: password } = newUserForm.get('password')
    const { value: confirmPassword } = newUserForm.get('password_confirmation')
    return password === confirmPassword ? null : { passwordNotMatch: true }
  }
  submit () {
    let data=this.newUserForm.value
    data['reseller']=this.resellerId
    console.log(data)
    this.authService.register(data).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      },
      () => {}
    )
  }

  deleteUser (id) {}

  async userAdminModal (user) {
    const modal = await this.modalController.create({
      component: UsersAdminComponent,
      componentProps: {
        user: user
      },
      showBackdrop: true
    })

    await modal.present()
  }
}
