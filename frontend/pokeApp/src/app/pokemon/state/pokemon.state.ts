import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  GetAllPokemon,
  AddPokemon,
  EditPokemon,
  DeletePokemon,
  ReorderPokemon,
} from './pokemon.actions';
import Pokemon from './pokemon.model';
import { PokemonService } from 'src/app/pokemon/services/pokemon.service';
import { tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

export class PokemonStateModel {
  roster: Pokemon[];
  pokemonForm: {
      model: Pokemon;
      dirty: boolean;
      status: string;
      errors: any
  };
}

@State<PokemonStateModel>({
  name: 'pokemon',
  defaults: {
    roster: [],
    pokemonForm: {
      model: null,
      dirty: false,
      status: '',
      errors: {},
    }
  }
})
export class PokemonState {

  @Selector()
  static roster(state: PokemonStateModel) {
    return state.roster.sort((a, b) => {
      return a.order > b.order ? 1 : 0;
    });
  }

  constructor(private api: PokemonService) {}

  @Action(GetAllPokemon)
  getAll(ctx: StateContext<PokemonStateModel>, action: GetAllPokemon) {
    const state = ctx.getState();
    const { tid } = action.payload;
    console.log('fetching all with id: ', tid)
    return this.api.fetch(tid).pipe(
      tap(res => {
        const pokemon = res;
        ctx.patchState({ roster: [...pokemon ]});
      })
    );
  }
  @Action(AddPokemon)
  add(ctx: StateContext<PokemonStateModel>, action: AddPokemon) {
    const state = ctx.getState();
    const { data } = action.payload;
    return this.api.post(data).pipe(
      tap(res => {
        const pokemon = res;
        ctx.patchState({ roster: [...state.roster, pokemon ]});
      })
    );
  }
  @Action(EditPokemon)
  edit(ctx: StateContext<PokemonStateModel>, action: EditPokemon) {
    const state = ctx.getState();
    const { roster } = state;
    const {id, data } = action.payload;
    return this.api.patch(id, data).pipe(
      tap(res => {
        // Find the pokemon and replace it with the server result.
        const pokemon = res;
        const idx = roster.findIndex(p => p.id === pokemon.id);
        if (idx !== -1) {
          roster[idx] = pokemon;
        }
        ctx.patchState({roster});
      })
    );
  }
  @Action(DeletePokemon)
  delete(ctx: StateContext<PokemonStateModel>, action: DeletePokemon) {
    const state = ctx.getState();
    const { id } = action.payload;
    return this.api.delete(id).pipe(
      tap(res => {
        const roster = res;
        ctx.patchState({ roster });
      })
    );
  }
  @Action(ReorderPokemon)
  reorder(ctx: StateContext<PokemonStateModel>, action: ReorderPokemon) {
    const state = ctx.getState();
    const { from, to } = action.payload;
    const { roster } = state;
    const fPokemon = roster[from];
    const tPokemon = roster[to];

    return combineLatest([this.api.patch(fPokemon.id, {order: to}), this.api.patch(tPokemon.id, {order: from})]).pipe(
     tap(([fp, tp]) => {
       roster[from] = fp;
       roster[to] = tp;
       ctx.patchState({roster});
     }),
    );
  }
}
