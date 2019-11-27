
import { init, buildTables, getPokemon } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {

  //TODO: Change this to url params
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  let result = {};

  try{
    const pokemon = await getPokemon(client, data);
    result = success(pokemon);
  } catch(e) {
    result = failure({error: e});
  } finally {
    client.end();
    return result;
  }
};
