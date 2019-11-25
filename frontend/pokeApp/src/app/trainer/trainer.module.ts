import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerService } from './service/trainer.service';
import { TrainerDetailComponent } from './trainer-detail/trainer-detail.component';
import { NgxsModule } from '@ngxs/store';
import { TrainerState } from './state/trainer.state';
import { IonicModule } from '@ionic/angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TrainerDetailComponent,
    TrainerFormComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      TrainerState
    ]),
    NgxsFormPluginModule,
  ],
  providers: [
    TrainerService
  ],
  exports: [
    TrainerDetailComponent,
    TrainerFormComponent,
  ]
})
export class TrainerModule { }
