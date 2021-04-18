import config from './config';
import Discord from 'discord.js';

const client = new Discord.Client();

const heiksman = [
  'Heikki on likanen rotta t.toffitee',
  'Se haisee..',
  '0,5 piuhalle bless !',
  'Pieni pippeli',
  'Vuoden vegaani',
  'Kissamies 2.0',
  'Joulupukkiki on kateellinen sen parralle',
  'Vittuku ei oo massii..',
  'MENNÄÄ ANTAA JES JES JES',
  'Ei ei älä selkää, sattuu!!',
  'Poketkaa sit ku on tilaa...'
];

const jokes = [
  'Sul on pieni',
  'Mitä tähän nyt sanois..',
  'Heikki on komee',
  'Miksi naiset panostavat enemmän ulkonäköönsä kuin älyynsä? Koska miehet ovat pääsääntöisesti tyhmiä mutta eivät sokeita.',
  'Mitä yhteistä on gynegologilla ja ammattimuusikolla? Kummallakin se on alkanut harrastuksesta!',
  'Elämäni tarkoitus on olla varoittavana esimerkkinä muille.',
  'Mitä gynekologi sanoi ruokatunnin jälkeen? No mihis vittuun sitä jäikään',
  'Miksi Röllin vene upposi? Siitä puuttui tilipitappi',
];

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

    if (message.content === '!vitsi') {
      await message.channel.send(
        jokes[Math.floor(Math.random() * jokes.length)],
      );
    }

    if (message.content === '!heikki') {
      await message.channel.send(
        heiksman[Math.floor(Math.random() * heiksman.length)],
      );
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
