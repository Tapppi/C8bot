import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV ||= 'development';

if (
  process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'production'
) {
  throw new Error('unknown NODE_ENV');
}

const config = {
  nodeEnv: process.env.NODE_ENV,
  discordToken: process.env.DISCORD_TOKEN,
  databaseUrl: process.env.DATABASE_URL,
  botCommandPrefix: process.env.BOT_COMMAND_PREFIX ?? '.',
};

for (const [key, value] of Object.entries(config)) {
  if (!value) {
    throw new Error(`Missing config variable ${key}`);
  }
}

export default config;
