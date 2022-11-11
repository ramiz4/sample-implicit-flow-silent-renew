import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'http://localhost:8080/realms/myrealm',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'myclient',
        scope: `openid profile`,
        responseType: 'id_token token',
        silentRenewUrl: `${window.location.origin}/silent-renew.html`,
        silentRenew: true,
        logLevel: LogLevel.Debug,
        tokenRefreshInSeconds: 30
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
