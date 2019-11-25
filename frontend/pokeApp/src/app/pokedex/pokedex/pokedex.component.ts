import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PokedexState } from '../state/pokedex.state';
import { Observable } from 'rxjs';
import PokedexEntry from '../state/pokedex.model';
import { Get, Next } from '../state/pokedex.actions';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {


  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  @Select(PokedexState.pokemon) pokemon$: Observable<PokedexEntry[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new Get({page: 1}));
  }

  loadData(evt) {
    this.store.dispatch(new Next()).subscribe(_ => {
      evt.target.complete();
    });
  }

}
