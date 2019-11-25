import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store, Select } from '@ngxs/store';
import { AuthState } from '../state/auth.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuardService implements CanActivate {

  @Select(AuthState.isLoggedIn) signedIn$: Observable<boolean>;

  constructor(public router: Router, public store: Store) {
   }
   canActivate() {
     return this.signedIn$.pipe(
       map(
         loggedIn => {
           if(loggedIn) {
             return true;
           } else {
             return this.router.createUrlTree(['/login']);
           }
         }
       )
     );
   }
}
