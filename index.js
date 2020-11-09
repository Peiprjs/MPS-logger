const Discord = require("discord.js");
const config = require("./config.json");
const random = require('random');
const client = new Discord.Client();
const prefix = "!";
client.login(config.BOT_TOKEN);

console.log(`Logged in as ${client.user.tag}!`);

client.on("message", function(message) {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command === "fpverify") {
    const fpok = new Discord.MessageEmbed()
	.setColor('#0bfd00')
	.setTitle('Registration successful!')
	.setDescription('You have now been registered to the FP logging Trello. Please do not run this command again. Abusing this command can result in a bot blacklit and, as such, proper dismissal.')

    channel.message.send(fpok)
  };
})
