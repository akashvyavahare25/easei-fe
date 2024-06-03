import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface PeriodicElement {
  id:string,
  firstName: string;
  lastName: string;
  role: string;
  email: string;  
  phone: string;
 // address: string;
  //status: string;
}


const ELEMENT_DATA: PeriodicElement[] = [{id:'1',firstName: 'Dipak', 'lastName': 'Veer', 'role': ' Super Admin', 'email': 'dv@gmail.com','phone':'123344'},
{id:'2',firstName: 'ak', 'lastName': 'surve', 'role': 'user', 'email': 'ak@gmail.com','phone':'1993344'},
{id:'3',firstName: 'tj', 'lastName': 'chavan', 'role': ' Super Admin', 'email': 'tj@gmail.com','phone':'199123344'}

];
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  constructor(private _liveAnnouncer: LiveAnnouncer,private router: Router) { }
  displayedColumns: string[] = ['firstName', 'lastName', 'role', 'email','phone','actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  ngOnInit(): void {
  }
  @ViewChild(MatSort) sort: MatSort;
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  addUser(){
    this.router.navigate(['/user/create'])
  }
  editUser(ele:any){
    console.log(ele)
    this.router.navigate(['/user/update/'+ele.id])
  }

}
