import Trainer from './trainer.model';

export class TrainerFetch {
  static readonly type = '[Trainer] Get';
  constructor(public payload: { id: string }) { }
}
export class TrainerPatch {
  static readonly type = '[Trainer] Patch';
  constructor(public payload: { id: string, data: Partial<Trainer> }) { }
}


