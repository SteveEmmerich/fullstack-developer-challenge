import { init, buildTables, getPokemon } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  //TODO: Change this to url params

  const data = JSON.parse(event.pathParameters.id);

  const client = await init();

  client.connect();
  console.log(`connected building tables`);
  buildTables(client);
  console.log(`tables built`);

  let result = {};

  try {
    console.log(`get pokemon`);
    const pokemon = await getPokemon(client, data);
    console.log(`got pokemon data: ${JSON.stringify(pokemon)}`);
    result = success(pokemon);
  } catch (e) {
    result = failure({ error: e });
  } finally {
    await client.end();
    return result;
  }
};
