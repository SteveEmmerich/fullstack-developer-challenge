import { State, Action, StateContext } from '@ngxs/store';
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

  constructor(private api: PokemonService) {}

  @Action(GetAllPokemon)
  getAll(ctx: StateContext<PokemonStateModel>, action: AddPokemon) {
    const state = ctx.getState();
    this.api.fetch().pipe(
      tap(res => {
        const pokemon = res;
        ctx.patchState({ roster: [...pokemon ]});
      })
    );
  }
  @Action(AddPokemon)
  add(ctx: StateContext<PokemonStateModel>, action: AddPokemon) {
    const state = ctx.getState();
    this.api.post(action.payload).pipe(
      tap(res => {
        const pokemon = res;
        ctx.patchState({ roster: [...state.roster, pokemon ]});
      })
    );
  }
  @Action(EditPokemon)
  edit(ctx: StateContext<PokemonStateModel>, action: EditPokemon) {
    const state = ctx.getState();
    const {id, data } = action.payload;
    this.api.patch(id, data).pipe(
      tap(res => {
        // Find the pokemon and replace it with the server result. 
        const pokemon = res;
        ctx.patchState({ roster: [...state.roster, pokemon ]});
      })
    );
  }
  @Action(DeletePokemon)
  delete(ctx: StateContext<PokemonStateModel>, action: DeletePokemon) {
    const state = ctx.getState();
    const { id } = action.payload;
    this.api.delete(id).pipe(
      tap(res => {
        const roster = res;
        ctx.patchState({ roster });
      })
    );
  }
}
