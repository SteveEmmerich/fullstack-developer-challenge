import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Get, Search, Next } from './pokedex.actions';
import PokedexEntry from './pokedex.model';
import { PokedexService } from '../service/pokedex.service';
import { tap, map } from 'rxjs/operators';

export class PokedexStateModel {
  pokemon: PokedexEntry[];
  page: number;
}

@State<PokedexStateModel>({
  name: 'pokedex',
  defaults: {
    pokemon: [],
    page: 1
  }
})
export class PokedexState {


  @Selector()
  static pokemon(state: PokedexStateModel) {
    return state.pokemon.map(entry => {
      entry.showDetails = false;
      return entry;
    });
  }

  constructor(private api: PokedexService) {}

  @Action(Get)
  add(ctx: StateContext<PokedexStateModel>, action: Get) {
    const state = ctx.getState();
    const { page } = action.payload;
    return this.api.fetch(page).pipe(
      tap((res: PokedexEntry[]) => {
        ctx.patchState({page,  pokemon: [ ...state.pokemon, ...res] });
      })
    );
  }
  @Action(Search)
  search(ctx: StateContext<PokedexStateModel>, action: Search) {
    const state = ctx.getState();
    return this.api.search(action.payload.searchText).pipe(
      tap((res: PokedexEntry[]) => {
        ctx.patchState({ pokemon: [ ...state.pokemon, ...res] });
      })
    );
  }
  @Action(Next)
  next(ctx: StateContext<PokedexStateModel>, action: Next) {
    const state = ctx.getState();
    const page = state.page++;
    return ctx.dispatch(new Get({page}));
  }
}
