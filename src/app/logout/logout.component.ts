import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private oidcSecurityService: OidcSecurityService) { 
    this.oidcSecurityService.logoff();
  }
}
