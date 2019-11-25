import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TrainerFetch, TrainerPatch } from './trainer.actions';
import Trainer from './trainer.model';
import { TrainerService } from 'src/app/trainer/service/trainer.service';
import { tap } from 'rxjs/operators';

export class TrainerStateModel {
  trainer: Trainer;
  updateTrainerForm: {
    model: Trainer;
    dirty: boolean;
    status: string;
    errors: any
  };
}

@State<TrainerStateModel>({
  name: 'trainers',
  defaults: {
    trainer: null,
    updateTrainerForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    }
  }
})
export class TrainerState {

  constructor(private api: TrainerService) {}

  @Selector()
  static trainer(state: TrainerStateModel) {
    return state.trainer;
  }

  @Selector()
  static rosterCount(state: TrainerStateModel) {
    return state.trainer.roster.length;
  }

  @Action(TrainerFetch)
  get(ctx: StateContext<TrainerStateModel>, action: TrainerFetch) {
    const { id } = action.payload;
    return this.api.fetch(id).pipe(
      tap((trainer: Trainer) => {
        ctx.patchState({ trainer });
      }),
    );
  }

  @Action(TrainerPatch)
  edit(ctx: StateContext<TrainerStateModel>, action: TrainerPatch) {
    const { id, data } = action.payload;
    console.log(`patchin trainer: ${id} ${JSON.stringify(data)}`);
    return this.api.patch(id, data).pipe(
      tap((trainer: Trainer) => {
        ctx.patchState({ trainer });
      }),
    );
  }
}
