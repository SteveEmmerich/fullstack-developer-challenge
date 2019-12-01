import { Client } from 'pg';

export const init = async () => {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  });
  return client;
};

export const buildTables = async client => {
  try {
    client.query(`
      CREATE TABLE IF NOT EXISTS pokemon
      (
        id serial PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null,
        trainerId char(36),
        pokedexId char(36),
        nickname varchar(100),
        orderNum integer not null
      );
    `);
  } catch (e) {
    const message = `Pokemon table build failed ${e}`;
    console.error(message);
    throw message;
  }

  try {
    client.query(`
      CREATE TABLE IF NOT EXISTS trainers
      (
        id serial PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null,
        name varchar(100) not null,
        roster text[],
        age integer,
        email varchar(100) not null unique
      );
    `);
  } catch (e) {
    const message = `Trainer table build failed ${e}`;
    console.error(message);
    throw message;
  }

  try {
    client.query(`
      CREATE TABLE IF NOT EXISTS pokedex
      (
        id serial PRIMARY KEY,
        name varchar(100) not null,
        uuid char(36) not null UNIQUE,
        pokedex_number integer,
        description text,
        img text
      );
    `);
  } catch (e) {
    const message = `Pokedex table build failed ${e}`;
    console.error(message);
    throw message;
  }
};

const tryQuery = async (client, data, queryString) => {
  try {
    const res = await client.query(queryString, data);
    const { rows } = res;
    console.log(`res: ${JSON.stringify(res.rows[0])}`);
    return rows.length !== 0 ? rows[0] : null;
  } catch (e) {
    if (process.env.LOG_LEVEL === 'debug') {
      const message = `Error on query: ${queryString}\n data: ${data} \n error: ${e}`;
      console.error(message);
      throw message;
    } else {
      throw e.detail ? e.detail : e;
    }
  }
};

export const addTrainer = async (client, trainerData) => {
  console.log(`trainer Data: ${JSON.stringify(trainerData)}`);
  const { uuid, name, age, email } = trainerData;
  return tryQuery(
    client,
    [uuid, name, age, email],
    `insert into trainers(uuid, name, age, email) VALUES($1, $2, $3, $4) RETURNING *;`
  );
};

export const getTrainer = async (client, trainerId) => {
  return tryQuery(client, [trainerId], `SELECT * FROM trainers WHERE id = $1;`);
};

export const patchTrainer = async (client, trainerData) => {
  const { age, uuid } = trainerData;
  return tryQuery(
    client,
    [age, uuid],
    `UPDATE trainers SET age = $1 WHERE id = $2 RETURNING *;`
  );
};

export const getPokemon = async (client, trainerId) => {
  return tryQuery(
    client,
    [trainerId],
    `SELECT * FROM pokemon WHERE trainerId = $1`
  );
  /*   try {
    await client.query(
      `
      SELECT * FROM pokemon WHERE trainerId = $1
    `,
      [trainerId]
    );
  } catch (e) {
    throw e;
  } */
};

export const deletePokemon = async (client, pokemonId) => {
  await tryQuery(client, [pokemonId], `DELETE FROM pokemon WHERE id = $1;`);
  await tryQuery(
    client,
    [pokemonId],
    `UPDATE trainers SET roster = array_remove(roster, $1);`
  );
  /*try {
    await client.query(
      `
      DELETE * FROM pokemon WHERE id = $1
    `,
      [pokemonId]
    );
    await client.query(
      `
      UPDATE trainers SET roster = array_remove(roster, $1);
    `,
      [pokemonId]
    );
  } catch (e) {
    throw e;
  }*/
};

export const patchPokemon = async (client, pokemonData) => {
  const { id, nickname } = pokemonData;
  return tryQuery(
    client,
    [nickname, id],
    `UPDATE pokemon SET nickname = $1 WHERE id = $2 returning *;`
  );
  /*  try {
    await client.query(
      `
      UPDATE pokemon SET nickname = $1 WHERE uuid = $2;
    `,
      [nickname, uuid]
    );
  } catch (e) {
    throw e;
  } */
};

export const searchPokedex = async (client, trainerData) => {
  // expect a name or empty string, plus pagination
  const { uuid, name, age, email } = trainerData;
  const res = await client.query(
    `
    insert into trainers (uuid, name, age, email) VALUES($1, $2,$ 3, $4) RETURNING;
  `,
    [uuid, name, age, email]
  );
  if (res) return res;
};

// Adds one pokemon to the roster.
export const addToRoster = async (client, data) => {
  const { uuid, nickname, orderNum, trainerId, pokedexId } = data;
  //try {
  const pokemon = await tryQuery(
    client,
    [uuid, nickname, orderNum, trainerId, pokedexId],
    `insert into pokemon(uuid, nickname, orderNum, trainerId, pokedexId) VALUES($1, $2, $3, $4, $5) RETURNING *;`
  );
  console.log(`Insert response: ${JSON.stringify(pokemon)}`);
  if (!pokemon) return pokemon;
  /*  const { rows } = client.query(
      `
      insert into pokemon (uuid, nickname, order, trainerId, pokedexId) VALUES($1, $2,$ 3, $4, $5) RETURNING *;
    `,
      [uuid, nickname, order, trainerId, pokedexId]
    ); */
  const trainer = await tryQuery(
    client,
    [pokemon.id, trainerId],
    `update trainers set roster = array_append(roster, $1) where trainers.id = $2;`
  );

  console.log(`Insert response: ${JSON.stringify(trainer)}`);
  //if (!trainer) return trainer;

  return pokemon;
  /*const res = await client.query(
      `
      update trainers set roster = array_append(roster, $1) where trainers.id = $2;
    `,
      [uuid.toString(), trainerId]
    );
    console.log(`update response: ${JSON.stringify(res)}`);
  } catch (e) {
    throw e;
  }*/
};
