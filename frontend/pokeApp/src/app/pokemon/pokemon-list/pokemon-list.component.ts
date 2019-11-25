import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PokemonState } from '../state/pokemon.state';
import { Observable } from 'rxjs';
import Pokemon from '../state/pokemon.model';
import { GetAllPokemon, ReorderPokemon, DeletePokemon } from '../state/pokemon.actions';
import { IonReorderGroup, ModalController, AlertController } from '@ionic/angular';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { alertController } from '@ionic/core';



@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

  @Select(PokemonState.roster) roster$: Observable<Pokemon[]>;

  constructor(private store: Store, private modalCrtl: ModalController, private alertCrt: AlertController) { }

  ngOnInit() {
    console.log('calling dispatch get all pokemon')
    this.store.dispatch(new GetAllPokemon({tid: 't1'}));
  }
  changeOrder(evt) {
    const { from, to } = evt.detail;
    this.store.dispatch(new ReorderPokemon({from, to})).subscribe(_ => {
      evt.detail.complete();
    });
  }

  toggleReorder() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }
  async showDetails(pokemon) {
    const modal = await this.modalCrtl.create({
      component: PokemonDetailsComponent,
      componentProps: {
        pokemon
      }
    });

    await modal.present();
    await modal.onWillDismiss();
  }

  async delete(pokemon) {
    const alert = await this.alertCrt.create({
      header: 'Confirm!',
      message: 'Are you <strong>Sure</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Yes',
          handler: () => {
            this.store.dispatch(new DeletePokemon({id: pokemon.id}));
          }
        }
      ]
    });

    await alert.present();
  }
}
