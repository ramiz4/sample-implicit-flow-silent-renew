import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {

  @ViewChild('userMenu') userMenu!: ElementRef;
  isUserMenuOpen = false;

  configuration$!: Observable<OpenIdConfiguration>;
  userDataChanged$!: Observable<OidcClientNotification<any>>;
  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;
  checkSessionChanged$!: Observable<boolean>;
  checkSessionChanged: any;

  menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Team', href: '/team' },
    { label: 'Projects', href: '/projects' },
    { label: 'Calendar', href: '/calendar' },
    { label: 'Reports', href: '/reports' }
  ];

  userMenuItems = [
    { label: 'Profile', href: 'profile' },
    { label: 'Settings', href: 'settings' }
  ];

  constructor(private renderer: Renderer2, private oidcSecurityService: OidcSecurityService) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        e.target !== this.userMenu?.nativeElement && 
        (e.target as any)?.parentElement !== this.userMenu?.nativeElement && 
        (e.target as any)?.parentElement?.parentElement !== this.userMenu?.nativeElement && 
        (e.target as any)?.parentElement?.parentElement?.parentElement !== this.userMenu?.nativeElement
      ) {
        this.isUserMenuOpen = false;
      }
    });
  }

  ngOnInit() {
    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;
    this.checkSessionChanged$ = this.oidcSecurityService.checkSessionChanged$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

}
