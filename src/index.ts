import _ from './env';
import Discord from "discord.js";

const client = new Discord.Client();

async function main() {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error('No discord token configured, copy .env.dist to .env and set DISCROD_TOKEN')
  }

  // Login to discord
  await client.login(process.env.DISCORD_TOKEN);

  client.on("ready", () => {
      console.log("Bot ready!");
    });

    client.on("message", (message) => {
      if (message.content === "!test") {
        message.reply("Toimii");
      }
    });
}

main().then(() => console.log('exit')).catch((err) => {
  console.error('Fatal error from main function:')
  console.error(err);
  process.exit(1);
});
