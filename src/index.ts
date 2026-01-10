import process from 'node:process';
import {Client, GatewayIntentBits} from 'discord.js';
import knex, {type Knex as _Knex} from 'knex';
import {Model as m} from 'objection';
import type _ from './environment.d.js';
import {handleCommand} from './commands/index.js';
import config from './config.js';
import knexConfig from './knexfile.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.MessageContent,
  ],
});

// Connect to database
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const database = knex(knexConfig) as _Knex<any, Array<Record<string, any>>>;
m.knex(database);

if (process.env.NODE_ENV === 'production') {
  await database.migrate.latest();
}

await database.raw('SELECT 1;');

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

console.log('Server init ready');
