import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import Pokemon from '../state/pokemon.model';
import { EditPokemon } from '../state/pokemon.actions';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemonForm: FormGroup;
  pokemonForm$: Observable<Pokemon>;
  pokemon: Pokemon;
  constructor(private store: Store, private formBuilder: FormBuilder, private modalCrtl: ModalController, public navParams: NavParams) { 
    this.createForm();
  }

  ngOnInit() {
    this.pokemon = { ...this.navParams.data.pokemon };
    this.pokemonForm.patchValue(this.navParams.data.pokemon);
  }

  createForm() {
    this.pokemonForm = this.formBuilder.group({
      name: [''],
      nickname: [''],
      description: ['']
    });
  }

  dismiss() {
    this.modalCrtl.dismiss();
  }
  save() {
    const pokemon = this.pokemonForm.value;
    console.log(`${JSON.stringify(pokemon)}`)
    this.store.dispatch(new EditPokemon({id: this.pokemon.id, data: pokemon})).subscribe(_=>{
      this.modalCrtl.dismiss();
    });
  }
}
