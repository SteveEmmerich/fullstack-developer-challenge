import { State, Action, StateContext } from '@ngxs/store';
import { PokedexAction } from './pokedex.actions';

export class PokedexStateModel {
  public items: string[];
}

@State<PokedexStateModel>({
  name: 'pokedex',
  defaults: {
    items: []
  }
})
export class PokedexState {
  @Action(PokedexAction)
  add(ctx: StateContext<PokedexStateModel>, action: PokedexAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }
}
