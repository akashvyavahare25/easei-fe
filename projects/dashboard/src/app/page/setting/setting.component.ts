import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {HostBinding} from '@angular/core';
import {OverlayContainer} from "@angular/cdk/overlay";
import { select, Store } from '@ngrx/store';
import * as Reducers from '../../store/reducers'
import * as moment from 'moment'

/**
 * Created at 1397/12/14 (2019/3/5).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

 const THEME_DARKNESS_SUFFIX = `-dark`;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  updateBtnShow:boolean=true
  checked = false;
  name:any='Light' 
  username:any;
  lastLogin:any
  hemes: string[] = [
		"deeppurple-amber",
		"indigo-pink",
		"pink-bluegrey",
		"purple-green",
	];
	
	@HostBinding('class') activeThemeCssClass: string;
	isThemeDark = false;
	activeTheme: string;
  
  constructor( private fb: FormBuilder,private overlayContainer: OverlayContainer,private store: Store<any>) { 
	this.store.pipe(select(Reducers.getUser)).subscribe(state => {
		// let date=new Date(state.lastlogin)
		this.lastLogin = moment.utc(state.lastlogin).local().format("DD-MM-yyyy HH:mm:ss");
		// this.lastLogin=moment(date.toLocaleString()).format("MM-DD-yyyy HH:mm:ss")
		this.username=state.userName
	  })
  } 
  ngOnInit(): void {
  }
  
  changed(){
    this.name="Dark" 
    if(this.checked != true){
      this.name='Light' 
    }
  }
  setTheme(theme: string, darkness: boolean = false) {
		if (darkness === null)
			darkness = this.isThemeDark;
		else if (this.isThemeDark === darkness) {
			if (this.activeTheme === theme) return;
		} else
			this.isThemeDark = darkness;
		
		this.activeTheme = theme;
		
		const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;
		
		const classList = this.overlayContainer.getContainerElement().classList;
		if (classList.contains(this.activeThemeCssClass))
			classList.replace(this.activeThemeCssClass, cssClass);
		else
			classList.add(cssClass);
		
		this.activeThemeCssClass = cssClass;
	}
	
  toggleDarkness() {
		this.setTheme(this.activeTheme, !this.isThemeDark);
	}
}
