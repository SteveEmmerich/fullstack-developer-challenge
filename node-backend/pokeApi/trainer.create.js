import { v4 } from 'uuid/v4';
import { init, buildTables, addTrainer } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  console.log(event.body)
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  const uuid = v4();
  let result = {};

  try{
    const insertedTrainer = await addTrainer(client, {uuid, ...data});
    result = success(insertedTrainer);
  } catch(e) {
    result = failure({error: e});
  } finally {
    client.end();
    return result;
  }
};
