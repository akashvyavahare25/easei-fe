//@ts-nocheck
import { Component, HostBinding, Input, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../app/data.service';
import * as Reducers from '../../../../../../projects/contract-management/src/app/store/reducers'
import * as UserActions from '../../../../../../projects/contract-management/src/app/store/user/actions'
import * as SettingsActions from '../../../../../../projects/contract-management/src/app/store/settings/actions'
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
@Component({
    selector: '[appSidebar]',
    host: {
        'class': 'c-sidebar c-sidebar-dark'
    },
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    plant: any
    isView = false;
    omeVisible = false
    isLogin = true
    role: any
    plantvisible: boolean
    oemVisible1: boolean
    show = false
    loginrole: any
    loginVisible: boolean = true
    user: any
    routerUrl: any
    @HostBinding('class.c-sidebar-show') _alwaysShow = false;
    @HostBinding('class.c-sidebar-lg-show') _show = true;
    private _enableClickOutside = false;
    @Input()
    @HostBinding('class.c-sidebar-fixed') fixed = true;
    constructor(private eRef: ElementRef, private router: Router, public service: DataService, private store: Store<any>) {
        this.routerUrl = router.url;
        this.plant = localStorage.getItem('login');
        this.role = localStorage.getItem('role') ? localStorage.getItem('role') : ""
        this.role = this.role.split(',')
        this.user = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
        if (_.includes(this.role, 'admin') || _.includes(this.role, 'portfolio') && _.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.isView = false;
            this.loginVisible = false
            this.plantvisible = true
            this.oemVisible1 = true
            if (this.routerUrl.includes("/front/plant/")) {
                this.plantvisible = false
                this.loginVisible = true
                this.oemVisible1 = true;
                this.omeVisible = false;
                this.isView = true;               
            }
            if (this.routerUrl.includes("/front/oem/dashboard/")) {
                this.omeVisible = true;
                this.oemVisible1 = false
                this.loginVisible = true
                this.plantvisible = true
                this.isView = false;
            }

        } else if (_.includes(this.role, 'portfolio') && _.includes(this.role, 'plant')) {
            this.isView = false;
            this.loginVisible = false
            this.plantvisible = true
            this.oemVisible1 = false
            if (this.routerUrl.includes("/front/plant/")) {
                this.plantvisible = false
                this.loginVisible = true
                this.omeVisible = false;
                this.oemVisible1 = false;
                this.isView = true;
            }
        } else if (_.includes(this.role, 'portfolio') && _.includes(this.role, 'oem')) {
            this.isView = false;
            this.loginVisible = false
            this.plantvisible = false
            this.oemVisible1 = true
            if (this.routerUrl.includes("/front/oem/dashboard/")) {
                this.omeVisible = true;
            this.oemVisible1 = false
            this.loginVisible = true
            this.plantvisible = false
            this.isView = false;
            }
        } else if (_.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.isView = true;
            this.loginVisible = false
            this.plantvisible = false
            this.oemVisible1 = true
            if (this.routerUrl.includes("/front/plant/")) {
                this.plantvisible = false
                this.loginVisible = false
                this.omeVisible = false;
                this.oemVisible1 = true;
                this.isView = true;
            }
            if (this.routerUrl.includes("/front/oem/dashboard/")) {
                this.omeVisible = true;
                this.oemVisible1 = false
                this.loginVisible = false
                this.plantvisible = true
                this.isView = false;
            }
        }
        else if (_.includes(this.role, 'portfolio')) {
            this.isView = false;
            this.loginVisible = false
            this.plantvisible = false
            this.oemVisible1 = false
        } else if (_.includes(this.role, 'plant')) {
            this.isView = true;
            this.loginVisible = false
            this.plantvisible = false
            this.oemVisible1 = false
        } else if (_.includes(this.role, 'oem')) {
            this.omeVisible = true;
            this.loginVisible = false
            this.plantvisible = false
            this.oemVisible1 = false
        }
    }
    OemRouter() {
        this.router.navigate(['/front/oem/dashboard/new']);
        if (_.includes(this.role, 'admin') || _.includes(this.role, 'portfolio') && _.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.omeVisible = true;
            this.oemVisible1 = false
            this.loginVisible = true
            this.plantvisible = true
            this.isView = false;
        } else if (_.includes(this.role, 'portfolio') && _.includes(this.role, 'oem')) {
            this.omeVisible = true;
            this.oemVisible1 = false
            this.loginVisible = true
            this.plantvisible = false
            this.isView = false;
        } else if (_.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.omeVisible = true;
            this.oemVisible1 = false
            this.loginVisible = false
            this.plantvisible = true
            this.isView = false;
        } else {
            this.omeVisible = false;
            this.loginVisible = true
            this.plantvisible = true
            this.isView = false;
        }
    }
    portfolioRouter() {
        this.router.navigate(['/front/portfolio/home']);
        if (_.includes(this.role, 'admin') || _.includes(this.role, 'portfolio') && _.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.loginVisible = false
            this.isView = false;
            this.oemVisible1 = true;
            this.omeVisible = false;
            this.plantvisible = true
        } else if (_.includes(this.role, 'portfolio') && _.includes(this.role, 'oem')) {
            this.omeVisible = false;
            this.oemVisible1 = true
            this.loginVisible = false
            this.plantvisible = false
            this.isView = false;
        } else {
            this.loginVisible = false
            this.isView = false;
            this.omeVisible = false;
            this.plantvisible = true
        }
    }
    plantRouter() {
        this.router.navigate(['/front/plant/plants']);
        if (_.includes(this.role, 'admin') || _.includes(this.role, 'portfolio') && _.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.plantvisible = false
            this.loginVisible = true
            this.oemVisible1 = true;
            this.omeVisible = false;
            this.isView = true;
        } else if (_.includes(this.role, 'portfolio') && _.includes(this.role, 'plant')) {
            this.plantvisible = false
            this.loginVisible = true
            this.omeVisible = false;
            this.oemVisible1 = false;
            this.isView = true;
        } else if (_.includes(this.role, 'plant') && _.includes(this.role, 'oem')) {
            this.plantvisible = false
            this.loginVisible = false
            this.omeVisible = false;
            this.oemVisible1 = true;
            this.isView = true;
        }
        else {
            this.plantvisible = false
            this.loginVisible = true
            this.omeVisible = false;
            this.omeVisible1 = true;
            this.isView = true;
        }

    }
    toggle(): void {
        const smalScreen = window && window.innerWidth <= 992;
        if (smalScreen) {
            if (this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
                this._alwaysShow = true;
                this._enableClickOutside = false;
                setTimeout(() => this._enableClickOutside = true, 150);
            }
        } else {
            if (this._show || this._alwaysShow) {
                this._alwaysShow = false;
                this._show = false;
            } else {
                this._show = true;
            }
        }
    }

    logout() {
        // this.router.navigate(['']);

        this.store.dispatch(new UserActions.Logout())
    }
    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        if (this._alwaysShow && this._enableClickOutside) {
            if (this.eRef.nativeElement.contains(event.target)) {
                // clicked inside
            } else {
                // clicked outside
                this._alwaysShow = false;
            }
        }
    }
}
