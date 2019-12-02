import { State, Action, StateContext, NgxsOnInit, Selector } from '@ngxs/store';
import { Logout } from './auth.actions';
import { tap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Observable, Subject, from } from 'rxjs';

import { AmplifyService } from 'aws-amplify-angular';
import { Navigate } from '@ngxs/router-plugin';

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
  },
})
export class AuthState implements NgxsOnInit {
  private unsubscribe$ = new Subject<void>();

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
    this.amp.authStateChange$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(currentState => {
          const { state, user } = currentState;
          console.log(`user: ${JSON.stringify(user, null, 2)}`);
          const loggedIn = state === 'signedIn';
          ctx.setState({ state, user, loggedIn });
        }),
        withLatestFrom(this.amp.auth().currentUserInfo()),
        tap(([currentState, currentUserInfo]) => {
          const { state, user } = currentState;
          const loggedIn = state === 'signedIn';
          console.log(
            `current User Info: ${JSON.stringify(currentUserInfo, null, 2)}`
          );
          if (loggedIn) {
            ctx.dispatch(new Navigate(['/me/trainer']));
          }
        })
      )
      .subscribe();
  }
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>, action: Logout) {
    this.amp.auth().signOut();
    ctx.patchState({ loggedIn: false, user: null });
  }
}
