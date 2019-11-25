import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pokemon from '../state/pokemon.model';
import {
  BASE_URL,
  POKEMON_ENDPOINT,
} from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {

  url: string = '';
  constructor(private api: HttpClient) { }

  fetch() {
    return this.api.get(this.url).pipe(
      map(data => data as Pokemon[])
    );
  }
  post(data: Pokemon) {
    return this.api.post(this.url, data).pipe(
      map(res => res as Pokemon)
    );
  }
  patch(id: string, data: Partial<Pokemon>) {
    return this.api.patch(`${this.url}/${id}`, data).pipe(
      map(res => res as Pokemon)
    );
  }
  delete(id: string) {
    return this.api.delete(`${this.url}/${id}`).pipe(
      map(res => res as Pokemon[])
    );
  }
}