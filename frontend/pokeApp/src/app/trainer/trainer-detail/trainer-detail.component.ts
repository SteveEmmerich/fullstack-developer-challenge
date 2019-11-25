import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TrainerStateModel, TrainerState } from '../state/trainer.state';
import { Observable } from 'rxjs';
import { TrainerFetch, TrainerPatch } from '../state/trainer.actions';
import { tap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.scss'],
})
export class TrainerDetailComponent implements OnInit {

  @Select(TrainerState.trainer) trainer$: Observable<TrainerStateModel>;
  @Select(TrainerState.rosterCount) pokemonCount$: Observable<number>;
  edit: boolean = false;
  age: string;
  updateTrainerForm = new FormGroup({
    age: new FormControl()
  });
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new TrainerFetch({id: 't1'}));
  }
  toggleEdit() {
    this.edit = !this.edit;
  }
  saveChanges(id) {
    const age = this.updateTrainerForm.get('age').value;
    this.store.dispatch(new TrainerPatch({id, data: {age}})).subscribe(
      (_ => this.toggleEdit())
    );
  }
  updateAge(newAge) {
    this.age = newAge;
    console.log(`changed age ${this.age}, ${newAge}`);
  }

}
