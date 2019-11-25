import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';



@NgModule({
  declarations: [
    ExpandableComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ExpandableComponent
  ]
})
export class SharedModule { }
