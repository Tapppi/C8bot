import config from './config';
import Discord from 'discord.js';

const client = new Discord.Client();

async function main() {
  // Login to discord
  await client.login(config.DiscordToken);

  client.on('ready', () => {
    console.log('Bot ready');
  });

  client.on('message', async (message) => {
    console.log(
      `${message.author.username} lähetti viestin: ${message.content}`,
    );

    if (message.content === '!test') {
      await message.reply('Toimii madafaka');
    }

    if (message.content === '!heikki') {
      await message.reply('Heikki on koira. Hau hau');
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
