
import { init, buildTables, getTrainer } from './lib/common';
import { success, failure } from './lib/response';
import AWS from 'aws-sdk';

export const main = async (event, context) => {
  //TODO: Change this to url params
  const data = JSON.parse(event.body);

  const client = init();
  client.connect();
  buildTables(client);

  let result = {};

  try{
    const trainer = await getTrainer(client, data);
    result = success(trainer);
  } catch(e) {
    const trainer = {
      uuid: event.requestContext.identity.cognitoIdentityId,
      name: event.requestContext.identity.name,
      email: event.requestContext.identity.email,
    };
    let params = {
      ClientContext: context.name,
      FunctionName: 'trainerCreate',
      Payload: Buffer.from(JSON.stringify(trainer))
    };
    AWS.Lambda.invoke(params, (err, data) => {
      if (err) {
        result = failure({error: err});
      } else {
        result = success(data);
      }
    });
  } finally {
    client.end();
    return result;
  }
};
