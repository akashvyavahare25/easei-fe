import { Component, ElementRef, Renderer2, OnInit } from '@angular/core'
// import { AnySoaRecord } from 'dns';
import { NotificationService } from '../../../../../src/app/services/notification.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ElementSchemaRegistry } from '@angular/compiler';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  isCollapsed = false
  array:any
  showInput:any
  historyData:any
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private notificationService: NotificationService
    ) {}

  ngOnInit() {
    this.notificationService.getNotification().subscribe(res => {
      res.forEach(function (element) {
        element.history =[];
      });
      this.historyData=res     
    })
  }
  getTime(date) {
    return moment(date).format('YYYY-MM-DD, hh:mm A')
  }
  toggleInput() {
    this.showInput = !this.showInput
  }
  findHistory(item){    
    if(item.history.length <1 && !this.isCollapsed){
      this.isCollapsed=true
      this.notificationService.getHistoryById(item._id).subscribe(res => {
        setTimeout(() => {
          this.isCollapsed=false
        },500)
        if(res.length>0){
          _.each(res, (sche) => {          
            sche.name=sche.receiverUser[0].firstName+' '+sche.receiverUser[0].lastName
            item.history.push(sche)
          })
        }
      },err => {
        this.isCollapsed = false;
      });
   }
  }
 
}



