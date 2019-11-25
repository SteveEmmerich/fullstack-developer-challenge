import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './state/auth.state';
import { AuthService } from './service/auth.service';

import {
  AmplifyAngularModule,
  AmplifyIonicModule,
  AmplifyService
} from 'aws-amplify-angular';
import { AuthGuardService } from './service/auth-guard.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AmplifyAngularModule,
    AmplifyIonicModule,
    NgxsModule.forFeature([
      AuthState
    ])
  ],
  providers: [
    AuthService,
    AmplifyService,
    AuthGuardService
  ]
})
export class AuthModule { }
