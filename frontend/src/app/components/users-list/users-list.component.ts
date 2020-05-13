import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { ModalController } from '@ionic/angular'
import { UsersAdminComponent } from '../users-admin/users-admin.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { ApiService } from 'src/app/services/api.service'
import { PermissionsAdminComponent } from '../permissions-admin/permissions-admin.component'
import { DragulaService } from 'ng2-dragula'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() resellers: [Users]
  @Input() resellerId
  @Output() userChange: EventEmitter<Users> = new EventEmitter<Users>()

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
    ],
    role: [{ type: 'required', message: 'Role is required' }]
  }

  constructor (
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private apiService: ApiService,
    private dragulaService:DragulaService
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
        password_confirmation: ['', Validators.required],
        role: ['', Validators.required]
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
  onCreateUser () {
    let data = this.newUserForm.value
    data['reseller'] = this.resellerId
    console.log(data)
    this.authService.register(data).subscribe(
      res => {
        this.userChange.emit(res.data)
      },
      error => {
        console.log(error)
      },
      () => {}
    )
  }

  onDeleteUser (id) {
    this.apiService.delete('/users/' + id).subscribe(res => {
      this.userChange.emit(res.data)
    })
  }
  userUpdate (user) {
    console.log('afsfa')
    this.userChange.emit(user)
  }

  async userAdminModal (user) {
    const modal = await this.modalController.create({
      component: UsersAdminComponent,
      componentProps: {
        user: user
      },
      showBackdrop: true
    })
    await modal.present()
   await modal.onDidDismiss().then((res)=>{
      this.userUpdate(res.data)

    })
  }

  async permissionsAdminModal (user) {
    const modal = await this.modalController.create({
      component: PermissionsAdminComponent,
      componentProps: {
        user: user
      },
      showBackdrop: true
    })
    await modal.present()
   await modal.onDidDismiss().then((res)=>{
      this.dragulaService.destroy('bag')

    })
  }
  
}
