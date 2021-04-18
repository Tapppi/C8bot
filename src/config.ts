import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error(
    'No discord token configured, copy .env.dist to .env and set DISCORD_TOKEN',
  );
}

const config = {
  DiscordToken: process.env.DISCORD_TOKEN,
};

export default config;
