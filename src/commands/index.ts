import {PartialTextBasedChannelFields, Message, MessageEmbed} from 'discord.js';
import config from '../config';
import Trivia from '../models/Trivia';
import randomHaiku from '../public/haikus';

const vitsit = [
  'Sul on pieni',
  'Mitä tähän nyt sanois..',
  'Heikki on komee',
  'Miksi naiset panostavat enemmän ulkonäköönsä kuin älyynsä? Koska miehet ovat pääsääntöisesti tyhmiä mutta eivät sokeita.',
  'Mitä yhteistä on gynegologilla ja ammattimuusikolla? Kummallakin se on alkanut harrastuksesta!',
  'Elämäni tarkoitus on olla varoittavana esimerkkinä muille.',
  'Mitä gynekologi sanoi ruokatunnin jälkeen? No mihis vittuun sitä jäikään',
  'Miksi Röllin vene upposi? Siitä puuttui tilipitappi',
];

export async function handleCommand(message: Message) {
  // Console.log(`${message.author.username} lähetti viestin: ${message.content}`);

  const content = message.content.slice(config.botCommandPrefix.length);

  if (content === 'help') {
    await printHelp(message.channel);
    return;
  }

  if (content === 'test') {
    await message.reply('Toimii madafaka');
    return;
  }

  if (content === 'vitsi') {
    await message.channel.send(
      vitsit[Math.floor(Math.random() * vitsit.length)],
    );
    return;
  }

  if (content === 'haiku') {
    await message.channel.send(randomHaiku());
  }

  if (content === 'categories') {
    const categories = await Trivia.query()
      .select('category')
      .count({
        categoryCount: 'category',
      })
      .groupBy('category');

    const categoryList = categories
      .map((trivia) => `_${trivia.category}_ ${trivia.categoryCount!}`)
      .join('\n');

    await message.channel.send(`**Available categories** (${categories.length})
${categoryList}`);
    return;
  }

  if (content.startsWith('del')) {
    const match = /del (\S*)$/.exec(content);

    if (!match || !match[1]) {
      await printHelp(message.channel);
      return;
    }

    const deletedCount = await Trivia.query().deleteById(match[1]);

    await (deletedCount === 1 ? message.react('✅') : message.react('❌'));
    return;
  }

  if (content.startsWith('trivia')) {
    const match = /trivia (\S*)( ([\S\s]*))?$/.exec(content);

    if (!match || !match[1]) {
      await printHelp(message.channel);
      return;
    }

    if (match[2]) {
      // Save given new content
      const trivia = await Trivia.query()
        .insert({
          category: match[1],
          content: match[3],
          author: message.author.username,
        })
        .returning('*');

      await message.react('✅');
      await sendPersonTrivia(message.channel, trivia);
    } else {
      // No new content found, get random trivia
      const trivia = await Trivia.query()
        // Inner query gives row numbers randomly and outer selects randomly chosen first row
        .from(
          Trivia.query()
            .select(
              '*',
              Trivia.raw('row_number() OVER (ORDER BY random()) as rn'),
            )
            .where('category', 'ILIKE', match[1])
            .as('t'),
        )
        .where('rn', 1);

      if (trivia.length === 0) {
        await message.react('❌');
        await message.channel.send(`No trivia found for category: ${match[1]}`);
        return;
      }

      await sendPersonTrivia(message.channel, trivia[0]);
    }
  }
}

async function printHelp(channel: PartialTextBasedChannelFields) {
  await channel.send(
    `Test: ${config.botCommandPrefix}test
Joke: ${config.botCommandPrefix}vitsi
Haiku: ${config.botCommandPrefix}haiku
Get random trivia: ${config.botCommandPrefix}trivia <category>
Add new trivia: ${config.botCommandPrefix}trivia <category> <content>
List categories: ${config.botCommandPrefix}categories
Delete trivia by id: ${config.botCommandPrefix}del <triviaId>`,
  );
}

async function sendPersonTrivia(
  channel: PartialTextBasedChannelFields,
  trivia: Trivia,
) {
  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(
      `${trivia.category.slice(0, 1).toUpperCase()}${trivia.category.slice(1)}`,
    )
    .setDescription(trivia.content)
    .setFooter({text: `Author: ${trivia.author}, ID: ${trivia.id}`})
    .setTimestamp(trivia.createdAt);

  return channel.send({embeds: [embed]});
}
