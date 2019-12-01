import { init, buildTables, patchPokemon } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  // Change this to url params
  const data = JSON.parse(event.body);

  const client = await init();
  client.connect();
  buildTables(client);

  let result = {};

  try {
    const pokemon = await patchPokemon(client, data);
    result = success(pokemon);
  } catch (e) {
    result = failure({ error: e });
  } finally {
    client.end();
    return result;
  }
};
