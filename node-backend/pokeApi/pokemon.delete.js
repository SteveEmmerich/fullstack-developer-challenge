import { init, buildTables, deletePokemon } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  // TODO: Change this to url params
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  let result = {};

  try {
    await deletePokemon(client, data);
    result = success();
  } catch (err) {
    result = failure({ error: err });
  } finally {
    client.end();
    return result;
  }
};
