import { Component } from '@angular/core'
import * as moment from 'moment';

@Component({
  selector: 'cui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  date :any
  logoImage:any

  constructor(){
    // this.logoImage = 'assets/images/logo1.png'
  }
  ngOnInit(): void{
    let datetime=new Date()
    this.date= moment(datetime).format('YYYY')
  }
}
