import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex/pokedex.component';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { PokedexState } from './state/pokedex.state';
import { PokedexService } from './service/pokedex.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PokedexComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    NgxsModule.forFeature([
      PokedexState
    ]),
    SharedModule
  ],
  providers: [
    PokedexService
  ],
  exports: [
    PokedexComponent
  ]
})
export class PokedexModule { }
