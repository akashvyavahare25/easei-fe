import { Component, HostListener, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { formioOptions } from './../../../constants/formiOptions'
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
  options: any
  isModalVisible: any = false
  pCollectionData: any = []
  public form: any = { components: [] }
  profileForm: any
  paramaterId: any = null
  showConfiguration: boolean = false
  listOfOption: Array<{ label: string; value: string }> = [
    { label: 'General', value: 'General' },
    { label: 'Pharma', value: 'Pharma' },
    { label: 'Chemical', value: 'Chemical' },
  ]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private formBuilderService: FormBuilderService,
    private notification: NzNotificationService,
    private cdref: ChangeDetectorRef
  ) {
    this.setPopupStyle()
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.nullValidator],
      externalCode: ['', Validators.required],
      status: ['', Validators.required],
      category: [[], Validators.required],
    })
    this.options = formioOptions
  }

  ngAfterViewInit(): void {
    if (this.paramaterId) {
      this.formBuilderService.getDataById(this.paramaterId).subscribe(res => {
        this.formBuilderService.getAllPCollectionByCode(res.code).subscribe(res => {
          if (res.length > 0) {
            this.pCollectionData = res;
            this.isModalVisible = true;
          }
        })
        this.profileForm.patchValue({
          name: res.name,
          code: res.code,
          status: res.status,
          category: res.category,
          externalCode: res.externalCode
        })
        this.form.components.push(res.configuration[0])
        this.showConfiguration = true
      })
    } else {
      this.showConfiguration = true
    }
    this.cdref.detectChanges();
  }

  submitForm() {
    this.markFormGroupDirty(this.profileForm)
    if (this.profileForm.valid) {
      if (this.form.components.length > 0) {
        let data
        if (this.paramaterId) {
          if (this.pCollectionData.length == 0) {
            data = {
              name: this.profileForm.value.name,
              code: this.profileForm.value.code,
              externalCode: this.profileForm.value.externalCode,
              status: this.profileForm.value.status,
              configuration: this.form.components,
              category: this.profileForm.value.category,
              type: this.form.components[0].dataSrc === 'master' ? 'select-master' : this.form.components[0].type,
              _id: this.paramaterId,
            }

            this.formBuilderService.updateFormBuilder(data).subscribe(res => {
              this.notification.success('Successfully', 'You have successfully update paramater!')
              const dialogClose: any = document.querySelector('[ref="dialogClose"]')
              if (dialogClose) {
                dialogClose.click()
              }
              setTimeout(() => {
                this.form = {}
              }, 300)
              setTimeout(() => {
                this.router.navigate(['/parameter/all'])
              }, 700)
            })
          } else {
            this.isModalVisible = true;
          }
        } else {
          data = {
            name: this.profileForm.value.name,
            code: this.profileForm.value.code,
            externalCode: this.profileForm.value.externalCode,
            status: this.profileForm.value.status,
            configuration: this.form.components,
            type: this.form.components[0].dataSrc === 'master' ? 'select-master' : this.form.components[0].type,
            category: this.profileForm.value.category,
          }
          this.formBuilderService.saveFormBuilder(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully save paramater!')
            this.profileForm.reset()
            this.profileForm.get('code').setValue('');
            const dialogClose: any = document.querySelector('[ref="dialogClose"]')
            if (dialogClose) {
              dialogClose.click()
            }
            setTimeout(() => {
              this.form = {}
            }, 300)
          })
        }
      } else {
        this.notification.warning('Warning', 'parameter configuration is empty')
      }
    }
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  clearForm() {
    const dialogClose: any = document.querySelector('[ref="dialogClose"]')
    if (dialogClose) {
      dialogClose.click()
    }
    this.profileForm.reset()
    setTimeout(() => {
      this.form = {}
    }, 300)
  }

  onChange(event) {
    const self = this
    const myobj = document.getElementsByClassName('formio-dialog-overlay')
    if (myobj.length > 0) {
      myobj[0].remove()
    }

    if (this.form && this.form.components && this.form.components.length > 1) {
      setTimeout(() => {
        this.form.components.shift()
      }, 300)
    }

    setTimeout(() => {
      self.setPopupStyle()
    }, 100)
  }

  ngOnDestroy() {
    const dialogClose: any = document.querySelector('[ref="dialogClose"]')
    if (dialogClose) { dialogClose.click() }
  }

  closeEdit() {
    const dialogClose: any = document.querySelector('[ref="dialogClose"]')
    if (dialogClose) {
      dialogClose.click()
    }
  }

  cancelEdit() {
    this.closeEdit()
    this.router.navigate(['drone/parameter/all'])
  }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }

  setPopupStyle() {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      const element = document.getElementsByClassName('formio-dialog-content')
      if (element.length > 0) {
        if (state.isMenuCollapsed) {
          element[0].classList.add('menuCollaps')
          element[0].classList.remove('menuNoCollaps')
        } else {
          element[0].classList.add('menuNoCollaps')
          element[0].classList.remove('menuCollaps')
        }
      }
    })
  }
}
