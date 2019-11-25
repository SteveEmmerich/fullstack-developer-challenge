export class PokedexAction {
  static readonly type = '[Pokedex] Add item';
  constructor(public payload: string) { }
}
