import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (
  process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'production'
) {
  throw new Error('unknown NODE_ENV');
}

const config = {
  NodeEnv: process.env.NODE_ENV,
  DiscordToken: process.env.DISCORD_TOKEN,
  BotCommandPrefix: process.env.BOT_COMMAND_PREFIX ?? '.',
};

for (const [key, value] of Object.entries(config)) {
  if (!value) {
    throw new Error(`Missing config variable ${key}`);
  }
}

export default config;
