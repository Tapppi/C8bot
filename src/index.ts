import Discord from "discord.js";
const client = new Discord.Client();
client.login("ODMzMDY3OTM2NTY2MzQ1Nzcw.YHs8-Q.SKmcEufh0jqWGXS1GkKu1pMhqBE");

client.on("ready", () => {
    console.log("Bot ready!");
  });

  client.on("message", (message) => {
    if (message.content === "!test") {
      message.reply("Toimii");
    }
  });