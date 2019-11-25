import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BASE_URL,
  TRAINER_ENDPOINT,
} from '../../../environments/environment';
import { map, tap, take } from 'rxjs/operators';
import Trainer from '../state/trainer.model';

@Injectable()
export class TrainerService {

  constructor(private api: HttpClient) {
    console.log(`${BASE_URL}/${TRAINER_ENDPOINT}/`);
  }

  fetch(id) {
    console.log(`fetch called`);
    return this.api.get(`${BASE_URL}/${TRAINER_ENDPOINT}/${id}`).pipe(
      tap(d => console.log(JSON.stringify(d))),
      map(t => t as Trainer),
    );
  }

  patch(id: string, data: Partial<Trainer>) {
    return this.api.patch(`${BASE_URL}/${TRAINER_ENDPOINT}/${id}`, data);
  }

}
