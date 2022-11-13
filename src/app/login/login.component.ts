import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  template: ''
})
export class LoginComponent {
  constructor(private oidcSecurityService: OidcSecurityService) { 
    this.oidcSecurityService.authorize();
  }
}
