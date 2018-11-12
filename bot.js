/*
COUNTDOWNTOXMAS : COUNTDOWN BOT
MADE BY EARTHAROID

>>>>>>>
https://github.com/Eartharoid/ChristmasCountdown
>>>>>>>

---------------------------------------
sorry for bad code xD
*/
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('quick.db');
const prefix = config.prefix;

setInterval(() => {
let today=new Date();
var xmas=new Date(today.getFullYear(), 11, 24);
if (today.getMonth()==11 && today.getDate()>24){ xmas.setFullYear(xmas.getFullYear()+1);}
var one_day=1000*60*60*24;
let daysleft = Math.ceil((xmas.getTime()-today.getTime())/(one_day));
let xmasmsg = "";
if (daysleft == 1) {let xmasmsg="It's Christmas Eve!";}
if (daysleft < 1) {let xmasmsg=":snowflake: **Merry Christmas!** :snowflake:";}
let now = today.getHours();
}, 3600000) // 1 hour


client.on('ready', () => {
  console.log(`CountdownToXMAS Bot\nConnected as ${client.user.tag}\nReady to countdown in ${client.guilds.size} servers for ${client.users.size} users...\n`);

  client.user.setPresence({ game: { name: `on ${config.website} | ${config.prefix}help` }, status: 'dnd' })
  .catch(console.error);

// [AUTO] DAILY COUNTDOWN
setInterval(() => {
    if(now == 0 || now == 00){
      let data = db.fetchAll();
      for (var i = 0, len = data.length; i < len; i++) {
        let cc = data[i].data;
        let countdownchannel = cc.substring(21, 39);
        // console.log(countdownchannel) // testing
        try{
          const embed = new Discord.RichEmbed()
          .setTitle(`${daysleft} days to Christmas`)
          .setURL(`${config.website}`)
          .setDescription(`\nThere are **${daysleft}** days until Christmas! \n\nCountdown to Christmas live at [countdowntoxmas.tk](${config.website}). \n${xmasmsg}\n`)
          .setColor(0xD60028)
          .setTimestamp()
          .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
          client.channels.get(countdownchannel).send({embed});
        } catch(err){
          return; // if error, do nothing
        }
    }
      console.log(`There are ${daysleft} days left to Christmas!`);
      console.log(`  > Sending daily countdown to ${data.length} channels...`);
  } else {
    return;
  }
    }, 3600000) // 1 hour
// }, 5000) // for testing purposes >>>>>> MUST CHANGE <<<<<<<
// END

});

client.on("guildCreate", guild => {
  if(client.guilds.size == 100) {guild.owner.send(`:tada: THANK YOU! \`${guild.name}\` IS THE 100th SERVER!\n`);}
  // OLD // guild.owner.send(`**»** Hello, ${guild.owner}. Please type \`${config.prefix}channel\` to set the daily countdown channel. When you no longer want the daily countdown, just use the \`${config.prefix}reset\` command.\nIf you like the bot, please upvote it here: https://discordbots.org/bot/509851616216875019`)


  guild.owner.send(`**»** Hello, ${guild.owner}. Thanks for adding my bot to your server. \nEvery day at some time between \`00:00\` and \`01:00\` (UTC), the bot will send the daily countdown message to the channel you set with \`${config.prefix}channel\`. Typing \`${config.prefix}countdown\` will display the same message.\nIf you would like to disable the daily countdown, type  \`${config.prefix}reset\`, which will still allow users to use the manual countdown command.\nIf you like this bot, please upvote it at ${config.dbl} and share it with your friends to help other people find it.\nThanks,\n-<@319467558166069248>`);
   const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Help")
  .setDescription(`Counting down for ${client.users.size} users in ${client.guilds.size} guilds.`)
  .setColor(0x009999)
  .addField(`${prefix}ping`, `Displays the latency`)
  .addField(`${prefix}website`, `Displays live countdown link`)
  .addField(`${prefix}countdown`, `Shows how many days until Christmas`)
  .addField(`${prefix}channel`, `Set the channel you want the countdown to use`)
  .addField(`${prefix}reset`, `Reset settings & disable daily countdown`)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  guild.owner.send({embed});
});

client.on("guildDelete", guild => {
  try {
    db.delete(guild.id)
    guild.owner.send(`**»** Settings for \`${guild.name}\` (\`${guild.id}\`) has been removed from the database.\``)
  } catch(error){
    return;
  }

});


client.on('message', async message => {
  if(message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Commands start here
if(command === 'ping') {

  message.channel.startTyping();
    const m = await message.channel.send("Calculating...");
    m.edit("...")
    m.delete()
    const embed = new Discord.RichEmbed()
    .setTitle("Pong!")
    .setColor(0x009999)
    .setDescription("`-----------------------------------------------`")
    .setTimestamp()
    .addField("Bot Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
    message.channel.send({embed});
    message.channel.stopTyping();

} else
if (command === 'help') {
  const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Help")
  .setDescription(`Counting down for ${client.users.size} users in ${client.guilds.size} guilds.`)
  .setColor(0x009999)
  .addField(`${prefix}ping`, `Displays the latency`)
  .addField(`${prefix}website`, `Displays live countdown link`)
  .addField(`${prefix}countdown`, `Shows how many days until Christmas`)
  .addField(`${prefix}channel`, `Set the channel you want the countdown to use`)
  .addField(`${prefix}reset`, `Reset settings & disable daily countdown`)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
} else
if (command === 'countdown') {

  const embed = new Discord.RichEmbed()
  .setTitle(`${daysleft} days to Christmas`)
  .setURL(`${config.website}`)
  .setDescription(`\nThere are **${daysleft}** days until Christmas! \n\nCountdown to Christmas live at [countdowntoxmas.tk](${config.website}). \n${xmasmsg}\n`)
  .setColor(0xD60028)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
} else
if (command === 'channel') {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
  // return  message.channel.send(":x: Error: `You don't have the required permission! (MANAGE_GUILD)`");
    const embed = new Discord.RichEmbed()
    .setTitle(`:x: Error`)
    .setDescription(`You need \`MANAGE_GUILD\` permission to set the countdown channel.`)
    .setColor(0xBB0000)
    .setTimestamp()
    .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
    message.channel.send({embed});
    return;
}
  // if has perms
  let chan = message.mentions.channels.first();
  if (!chan){
  // return message.channel.send(":x: Error: `You need to mention a channel.`");
  const embed = new Discord.RichEmbed()
  .setTitle(`:x: Error`)
  .setDescription(`You need to mention a channel.`)
  .setColor(0xBB0000)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
  return;
  }
  // DATABASE
   db.set(message.guild.id, { countdownchannel: chan.id });
  // db.set(message.guild.id, chan.id);

  const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Settings")
  .setDescription(`Daily countdown channel set to #${message.mentions.channels.first().name}`)
  .setColor(0x009999)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
} else
if (command === 'website') {
  const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Website")
  .setURL(`${config.website}`)
  .setDescription(`Countdown to Christmas live at [countdowntoxmas.tk](${config.website})`)
  .setColor(0x009999)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
} else
if (command === 'reset') {
  if (!message.member.hasPermission("MANAGE_GUILD")) {
  // return  message.channel.send(":x: Error: `You don't have the required permission! (MANAGE_GUILD)`");
    const embed = new Discord.RichEmbed()
    .setTitle(`:x: Error`)
    .setDescription(`You need \`MANAGE_GUILD\` permission to set the countdown channel.`)
    .setColor(0xBB0000)
    .setTimestamp()
    .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
    message.channel.send({embed});
    return;
  }
  // if has perms
  // DATABASE
  db.delete(message.guild.id);

  const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Settings")
  .setDescription(`Daily countdown disabled. \nType \`${config.prefix}channel <#channel>\` to set and enable the countdown.`)
  .setColor(0x009999)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
  message.channel.send({embed});
} //else
// if (command === 'test') {
  // let channel = db.get(`${message.guild.id}.countdownchannel`);
  // message.channel.send(channel)
  // client.channels.get(channel).send(`:white_check_mark: Success!`);
}
  // Commands end here
});


client.login(config.token);
