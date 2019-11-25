import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TrainerState } from './trainer.state';
import { TrainerFetch } from './trainer.actions';
import Trainer from './trainer.model';

describe('Trainer actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TrainerState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new TrainerFetch({id: 't1'}));
    store.select(state => state.trainer.trainer).subscribe((item: Trainer) => {
      expect(item).toEqual(jasmine.objectContaining([ 't1-1' ]));
    });
  });

});
