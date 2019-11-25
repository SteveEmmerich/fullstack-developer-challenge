import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { TrainerModule } from '../trainer/trainer.module';
import { PokemonModule } from '../pokemon/pokemon.module';
import { PokedexModule } from '../pokedex/pokedex.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TrainerModule,
    PokemonModule,
    PokedexModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
