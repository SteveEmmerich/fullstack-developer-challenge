import { Injectable } from '@angular/core';
import {
  BASE_URL,
  POKEDEX_ENDPOINT
} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import PokedexEntry from '../state/pokedex.model';
import { Observable } from 'rxjs';

@Injectable()
export class PokedexService {
  url = `${BASE_URL}/${POKEDEX_ENDPOINT}`;
  constructor(private http: HttpClient) { }

  fetch(page: number) {
    return this.http.get(`${this.url}?_page=${page}`);
  }
  search(searchText: string) {
    return this.http.get(`${this.url}?q=${searchText}`);
  }
}
