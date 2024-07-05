import { Component, OnInit } from '@angular/core';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {

  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;
  checkSessionChanged: any;

  constructor(public oidcSecurityService: OidcSecurityService) {}
  ngOnInit() {
    this.userData$ = this.oidcSecurityService.userData$.pipe(map(x => x.userData));

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}
