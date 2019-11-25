export class Get {
  static readonly type = '[Pokedex] Get';
  constructor(public payload: {page: number}) { }
}

export class Search {
  static readonly type = '[Pokedex] Search';
  constructor(public payload: {searchText: string}) {}
}

export class Next {
  static readonly type = '[Pokedex] Next';
}
