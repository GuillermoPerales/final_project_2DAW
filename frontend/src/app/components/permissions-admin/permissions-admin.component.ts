import { Component, OnInit, Input } from '@angular/core'
import { Users } from 'src/app/interfaces'
import { ApiService } from 'src/app/services/api.service'
import { DragulaService } from 'ng2-dragula'
import { AlertService } from 'src/app/services/alert.service'
import { ModalController } from '@ionic/angular'
import { Permissions } from '../../interfaces/permissions'

@Component({
  selector: 'app-permissions-admin',
  templateUrl: './permissions-admin.component.html',
  styleUrls: ['./permissions-admin.component.scss']
})
export class PermissionsAdminComponent implements OnInit {
  @Input() user: Users
  userId: Number
  userPermissions: Array<Permissions> = []
  avaliablePermissions: Array<Permissions> = []
  activePermissions: Array<Permissions> = []
  nonActivePermissions: Array<Permissions> = []
  dragulaActivo = []
  dragulaNoActivo = []
  constructor (
    private apiService: ApiService,
    private dragulaService: DragulaService,
    private alertService: AlertService,
    private modalController: ModalController
  ) {
    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'tertiary')
      console.log(el.id)
    })

    this.dragulaService.drop('bag').subscribe(({ el, target }) => {
      el.removeAttribute('color')
      if (target.id === 'activePermissions') {
        this.addPermission(el.id)
      } else if (target.id === 'nonActivePermissions') {
        this.removePermission(el.id)
      } else {
        console.log('Error')
      }
    })

    this.dragulaService.createGroup('bag', {
      removeOnSpill: false
    })
  }

  ngOnInit () {
    console.log(this.user)
    this.userId=this.user.identifier
    this.getUserPermissions()
  }

  getUserPermissions () {
    this.apiService
      .get('/users/' + this.user.identifier + '/permissions')
      .subscribe(res => {
        this.userPermissions = res.data
        console.log(this.userPermissions)
        this.getAvaliablePermissions()
      })
  }
  getAvaliablePermissions () {
    this.apiService.get('/permissions').subscribe(res => {
      this.nonActivePermissions = res.data.filter(
        permi =>
          !this.userPermissions.some(
            permi2 => permi.permission_id === permi2.permission_id
          )
      )
      console.log(this.nonActivePermissions)
    })
  }

  addPermission (id) {
    this.apiService
      .put('/users/' + this.userId + '/permissions/' + id)
      .subscribe(res => {
        console.log(this.userId)
        console.log(res)
      })
  }
  removePermission (id) {
    this.apiService
      .delete('/users/' + this.userId + '/permissions/' + id)
      .subscribe(res => {
        console.log(res)
        console.log(this.user)
      })
  }

  dismissModal () {
    delete this.userId
    this.modalController.dismiss()
  }
}
