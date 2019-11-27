import { v4 } from 'uuid/v4';
import { init, buildTables, addToRoster } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  const uuid = v4();
  let result = {};

  try {
    const insertedPokemon = await addToRoster(client, { uuid, ...data });
    result = success(insertedPokemon);
  } catch (e) {
    result = failure({ error: e });
  } finally {
    client.end();
    return result;
  }
};
