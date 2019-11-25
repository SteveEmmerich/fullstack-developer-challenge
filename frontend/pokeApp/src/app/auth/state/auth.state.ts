import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';
import { Logout } from './auth.actions';
import { tap, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  AmplifyService
} from 'aws-amplify-angular';

export class AuthStateModel {
  state: any;
  user: any;
  loggedIn: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    state: '',
    user: null,
    loggedIn: false,
  }
})
export class AuthState implements NgxsOnInit {
  unsubscribe$: Observable<null>;

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }
  @Selector()
  static isLoggedIn(state: AuthStateModel) {
    return state.loggedIn;
  }
  @Selector()
  static status(state: AuthStateModel) {
    return state.state;
  }
  constructor(private amp: AmplifyService) {}

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    this.amp.authStateChange$.pipe(
      takeUntil(this.unsubscribe$),
      tap(currentState => {
        const { state, user } = currentState;
        const loggedIn = currentState.state === 'signedIn';
        ctx.setState({state, user, loggedIn});
      })
    ).subscribe();
  }
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    this.amp.auth().signOut();
    ctx.patchState({ loggedIn: false, user: null, });
  }
}
