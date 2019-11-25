import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { PokemonState } from './state/pokemon.state';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { PokemonService } from './services/pokemon.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonFormComponent
  ],
  entryComponents: [
    PokemonDetailsComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([
      PokemonState
    ]),
    NgxsFormPluginModule,
    SharedModule
  ],
  providers: [
    PokemonService
  ],
  exports: [
    PokemonListComponent
  ]
})
export class PokemonModule { }
