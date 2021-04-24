import Discord from 'discord.js';
import knex from 'knex';
import {Model as m} from 'objection';

import _ from './environment.d';
import {handleCommand} from './commands';
import config from './config';
import knexConfig from './knexfile';

const client = new Discord.Client();

async function main() {
  // Connect to database
  const db = knex(knexConfig);
  m.knex(db);
  if (process.env.NODE_ENV === 'production') {
    await db.migrate.latest();
  }

  await db.raw('SELECT 1;');

  // Login to discord
  await client.login(config.DiscordToken);

  client.on('ready', () => {
    console.log('Bot ready');
  });

  client.on('message', async (message) => {
    if (message.content.startsWith(config.BotCommandPrefix)) {
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
