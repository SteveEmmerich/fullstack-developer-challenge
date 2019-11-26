import { Client } from 'pg';

export const init = async () => {
  const client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD
  });
  return client;
};

export const buildTables = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS trainers
    (
      id serial PRIMARY KEY,
      created TIMESTAMP DEFUALT CURRENT_TIMESTAMP,
      uuid char(32) not null,
      name varchar(100) not null,
      roster text[] references pokemon ON DELETE CASCADE,
      age INT,
      email varchar(100) not null,
    )
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS pokemon
    (
      id serial PRIMARY KEY,
      created TIMESTAMP DEFUALT CURRENT_TIMESTAMP,
      uuid char(32) not null,
      trainerId char(32) references trainers uuid,
      pokedexId char(32) references pokedex uuid,
      nickname varchar(100),
      order INT not null
    )`
  );

  await client.query(`
    CREATE TABLE IF NOT EXISTS pokedex
    (
      id serial PRIMARY KEY,
      name varchar(100) not null,
      uuid not null UNIQUE,
      description text,
      img text
    )
  `);
};

export const getTrainerById = async (client, uuid) => {
  let trainer = {};
  const trainerFromDB = await client.query(`
    select all from trainers where uuid = $1
  `, [uuid]);
  if (trainerFromDB.rows.length == 0) {
    return null;
  }
  trainer = trainerFromDB.rows[0];
  return trainer;
};

export const addTrainer = async (client, trainerData) => {
  const { uuid, name, age, email } = trainerData;
  const res = await client.query(`
    insert into trainers (uuid, name, age, email) VALUES($1, $2,$ 3, $4) RETURNING;
  `, [uuid, name, age, email]);
  if (res) return res;
};

export const getTrainer = async (client, trainerId) => {
 
  try{
    await client.query(`
      SELECT * FROM Trainers WHERE uuid = $1
    `, [trainerId]);
  } catch(e) {
    throw e
  }
};
export const patchTrainer = async (client, trainerData) => {
  const { age, uuid } = trainerData;
  try{
    await client.query(`
      UPDATE trainers SET age = $1 WHERE uuid = $2
    `, [age, uuid]);
  } catch(e) {
    throw e
  }
};
export const getPokemon = async (client, trainerId) => {
  try{
    await client.query(`
      SELECT * FROM pokemon WHERE trainerId = $1
    `, [trainerId]);
  } catch(e) {
    throw e
  }
};


export const deletePokemon = async (client, pokemonId) => {
  try{
    await client.query(`
      DELETE * FROM pokemon WHERE uuid = $1
    `, [pokemonId]);
    await client.query(`
      UPDATE trainers SET roster = array_remove(roster, $1);
    `, [pokemonId])
  } catch (e) {
    throw e;
  }
};

export const patchPokemon = async (client, pokemonData) => {
  const { uuid, nickname } = pokemonData;
  try{
    await client.query(`
      UPDATE pokemon SET nickname = $1 WHERE uuid = $2;
    `, [nickname, uuid]);
  } catch(e) {
    throw e;
  }
};

export const searchPokedex = async (client, trainerData) => {
  // expect a name or empty string, plus pagination
  const { uuid, name, age, email } = trainerData;
  const res = await client.query(`
    insert into trainers (uuid, name, age, email) VALUES($1, $2,$ 3, $4) RETURNING;
  `, [uuid, name, age, email]);
  if (res) return res;
};


// Adds one pokemon to the roster.
export const addToRoster = async (client, data) => {
  const { uuid, nickname,  order, trainerId, pokedexId } = data;
  try {
    await client.query(`
      insert into pokemon (uuid, nickname, order, trainerId, pokedexId) VALUES($1, $2,$ 3, $4, $5) RETURNING;
    `, [uuid, nickname,  order, trainerId, pokedexId]);
    await client.query(`
      update trainers set roster = array_cat(roster, {$1}) where trainers.id = $2;
    `, [uuid, trainerId]);
  } catch(e) {
    throw e;
  }
};