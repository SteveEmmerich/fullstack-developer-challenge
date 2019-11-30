import { v4 } from 'uuid';
import { init, buildTables, addTrainer } from './lib/common';
import { success, failure } from './lib/response';

export const main = async (event, context) => {
  const data = JSON.parse(event.body);

  const client = await init();
  client.connect();
  buildTables(client);

  const uuid = v4();
  console.log(`uuid: ${uuid}`);
  let result = {};

  try {
    const insertedTrainer = await addTrainer(client, { uuid, ...data });
    result = success(insertedTrainer);
  } catch (e) {
    result = failure({ error: e });
  } finally {
    client.end();
    return result;
  }
};
