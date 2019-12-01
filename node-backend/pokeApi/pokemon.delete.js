import { init, buildTables, deletePokemon } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  // TODO: Change this to url params
  const data = JSON.parse(event.pathParameters.id);

  const client = await init();
  client.connect();
  buildTables(client);

  let result = {};

  try {
    await deletePokemon(client, data);
    result = success();
  } catch (err) {
    result = failure({ error: err });
  } finally {
    await client.end();
    return result;
  }
};
