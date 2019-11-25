import Pokemon from './pokemon.model';

export class GetAllPokemon {
  static readonly type = '[Pokemon] Get All';
}

export class AddPokemon {
  static readonly type = '[Pokemon] Add';
  constructor(public payload: Pokemon) { }
}

export class EditPokemon {
  static readonly type = '[Pokemon] Edit';
  constructor(public payload: {id: string, data: Partial<Pokemon>}) {}
}

export class DeletePokemon {
  static readonly type = '[Pokemon] Delete';
  constructor(public payload: {id: string}) {}
}

export class ReorderPokemon {
  static readonly type = '[Pokemon] Reorder';
  constructor(public payload: {idOne: string, idTwo: string}) {}
}
