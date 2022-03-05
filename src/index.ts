import process from 'node:process';

import {Client, Intents} from 'discord.js';
import knex from 'knex';
import type {Knex as _Knex} from 'knex';
import {Model as m} from 'objection';

import type _ from './environment.d';
import {handleCommand} from './commands';
import config from './config';
import knexConfig from './knexfile';

const intents = new Intents([
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_INTEGRATIONS,
  Intents.FLAGS.GUILD_WEBHOOKS,
  Intents.FLAGS.GUILD_INVITES,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
]);
const client = new Client({intents});

async function main() {
  // Connect to database
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const db = knex(knexConfig) as _Knex<any, Array<Record<string, any>>>;
  m.knex(db);
  if (process.env.NODE_ENV === 'production') {
    await db.migrate.latest();
  }

  await db.raw('SELECT 1;');

  // Login to discord
  await client.login(config.discordToken);

  client.on('ready', () => {
    console.log('Bot ready');
  });

  client.on('messageCreate', async (message) => {
    if (message.content.startsWith(config.botCommandPrefix)) {
      await handleCommand(message);
    }
  });
}

main()
  .then(() => {
    console.log('Server init ready');
  })
  .catch((error) => {
    console.error('Fatal error while initializing');
    console.error(error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });
