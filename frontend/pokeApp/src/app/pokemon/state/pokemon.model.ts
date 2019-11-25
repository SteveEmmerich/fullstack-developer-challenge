import PokedexEntry from 'src/app/pokedex/state/pokedex.model';

export default interface Pokemon extends PokedexEntry {
  order: number;
  trainerId: string;
  nickname: string;
}
