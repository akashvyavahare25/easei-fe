import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from 'projects/dashboard/src/app/data.service';
import * as UserActions from 'projects/dashboard/src/app/store/user/actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  constructor(public service: DataService,private store: Store<any>) { }
  ngOnInit(): void {
  
  }
}
