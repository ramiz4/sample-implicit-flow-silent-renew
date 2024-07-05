import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {

    // constructor(private oidcSecurityService: OidcSecurityService) { }

    // canActivate(): Observable<boolean> {
    //     return this.oidcSecurityService.isAuthenticated();
    // }

    constructor(private oidcSecurityService: OidcSecurityService, private router: Router) { }

    async canActivate(): Promise<boolean> {
        if (!await firstValueFrom(this.oidcSecurityService.isAuthenticated())) {
            // this.router.navigate(['login']);
            this.oidcSecurityService.authorize();
            return false;
        }
        return true;
    }
}