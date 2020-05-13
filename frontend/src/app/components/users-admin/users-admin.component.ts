import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { ModalController } from '@ionic/angular'
import { UsersService } from 'src/app/services/users.service'
import { Roles } from 'src/app/interfaces/roles'

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {
  @Input() user: Users

  updateUserForm
  validationErrors = {
    user_email: [{ type: 'user_email', message: 'Email invalid form' }]
  }
  allRoles: [Roles]
  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalController: ModalController,
    private usersService: UsersService
  ) {
    this.updateUserForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      role: ['', Validators.required]
    })
  }

  ngOnInit () {
    console.log(this.user)
    this.updateUserForm.patchValue(this.user)
    this.usersService.getAllRoles().subscribe(roles => {
      this.allRoles = roles
      console.log(this.allRoles)
    })
  }

  updateUser () {
    this.authService
      .updateUser(this.user.identifier, this.updateUserForm.value)
      .subscribe(res => {
        console.log(res.data)
        this.dismissModal(res.data)
      })
  }
  dismissModal (user) {
    this.modalController.dismiss(user)
  }
}
