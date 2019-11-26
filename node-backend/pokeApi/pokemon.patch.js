
import { init, buildTables, patchPokemon } from './lib/common';
import { success, failure } from './lib/response';
import AWS from 'aws-sdk';

export const main = async (event, context) => {
  console.log(event.body)
  // Change this to url params
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  let result = {};

  try{
    const pokemon = await patchPokemon(client, data);
    result = success(pokemon);
  } catch(e) {
    result = failure({error: err});
  } finally {
    client.end();
    return result;
  }
};
