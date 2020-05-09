import { Component, OnInit, Input } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { ModalController } from '@ionic/angular'

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
  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private modalController: ModalController
    
  ) {
    this.updateUserForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['', Validators.required]
    })
  }

  ngOnInit () {
    console.log(this.user)
    this.updateUserForm.patchValue(this.user)
  }

  submit(){
    console.log(this.updateUserForm.value)
    this.authService.updateUser(this.user.identifier,this.updateUserForm.value)
    this.dismissModal
  }
  dismissModal(){
    this.modalController.dismiss()
  }
}
