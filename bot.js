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
// const moment = require('moment');
const prefix = config.prefix;
const discordbots = require("dblapi.js");
const dbl = new discordbots(config.dblapikey, client);

// let today=new Date();
// var xmas=new Date(today.getFullYear(), 11, 24);
// if (today.getMonth()==11 && today.getDate()>24){ xmas.setFullYear(xmas.getFullYear()+1);}
// var one_day=1000*60*60*24;
// let daysleft = Math.ceil((xmas.getTime()-today.getTime())/(one_day));
// let xmasmsg = "";
// if (daysleft == 1) {let xmasmsg="It's Christmas Eve!";}
// if (daysleft < 1) {let xmasmsg=":snowflake: **Merry Christmas!** :snowflake:";}
// let now = today.getHours();

// MOMENT
// var now = moment().get('hour');
// var year = moment().get('year');
// var xmas = moment([year, 12, 25]);
// var daysleft = moment().to(xmas);

// DBL EVENTS
dbl.on('posted', () => {
  console.log(`Posted server count to discordbots.org`);
});
dbl.on('vote', vote => {
  console.log(`Someone (${vote.user}) just voted!`);
});

// dbl.on('error', e => {
 // console.log(`[DBL ERROR] ${e}`);
// });

function now(){ // returns h hours
 let today = new Date();
 return today.getHours();
}

function daysleft(){
 let today=new Date();
 let xmas=new Date(today.getFullYear(), 11, 24);
 if (today.getMonth()==11 && today.getDate()>25){ xmas.setFullYear(xmas.getFullYear()+1);}
 let one_day=1000*60*60*24;
 let daysleft = Math.ceil((xmas.getTime()-today.getTime())/(one_day));
 return daysleft;
}

function xmasmsg(){
  let rmsg = "";
  if (daysleft() == 1) {let rmsg = "It's Christmas Eve!";}
  if (daysleft() < 1) {let rmsg = ":snowflake: **Merry Christmas!** :snowflake:";}
  return rmsg;
}


client.on('ready', () => {
  console.log(`CountdownToXMAS Bot\nConnected as ${client.user.tag}\nReady to countdown in ${client.guilds.size} servers for ${client.users.size} users...\n`);
  client.user.setPresence({ game: { name: `on ${config.website} | ${config.prefix}help` }, status: 'dnd' })
  client.user.setActivity(`the countdown to Christmas | ${config.prefix}help (countdowntoxmas.tk)`, { type: 'WATCHING' })
  .catch(console.error);
  setInterval(() => {
          dbl.postStats(client.guilds.size);
      }, 1800000);


// [AUTO] DAILY COUNTDOWN
setInterval(() => {

    if(now() == 0 || now() == 22){
      let data = db.fetchAll();
      for (var i = 0, len = data.length; i < len; i++) {
        let cc = data[i].data;
        let countdownchannel = cc.substring(21, 39); // this is where I gave up on life. how tf to do this properly!?
        // console.log(countdownchannel) // testing
        // if(client.channels.get(countdownchannel).permissionsFor(client.channels.get(countdownchannel).guild.me).has('SEND_MESSAGES') && client.channels.get(countdownchannel).permissionsFor(client.channels.get(countdownchannel).guild.me).has('EMBED_LINKS')){
        try{
          const embed = new Discord.RichEmbed()
          .setTitle(`${daysleft()} days to Christmas`)
          .setURL(`${config.website}?utm_source=discord`)
          .setDescription(`\nThere are **${daysleft()}** days until Christmas! \n\nCountdown to Christmas live at [countdowntoxmas.tk](${config.website}?utm_source=discord). \n${xmasmsg()}\n`)
          .setColor(0xD60028)
          .setTimestamp()
          .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
          client.channels.get(countdownchannel).send({embed});
        } catch(err){
          // client.channels.get(countdownchannel).guild.owner.send(`Sorry, looks like their was an error with the daily countdown for ${client.channels.get(countdownchannel).guild.name}. Please check the bot has permission to send messages and embed links in the channel you set.`)
          return; // no
        }
    // } else {
      // client.channels.get(countdownchannel).guild.owner.send(`Sorry, looks like the bot doesn't have \`SEND_MESSAGES\` or \`EMBED_LINKS\` permissions in the countdown channel. The countdown was not sent.`);
      // return;
    // }
    }
      console.log(`There are ${daysleft()} days left to Christmas!`);
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


  guild.owner.send(`**»** Hello, ${guild.owner}. Thanks for adding my bot to your server. \nEvery day between \`00:00\` and \`01:00\` (UTC), the bot will send the daily countdown message to the channel you set with \`${config.prefix}channel\`. Typing \`${config.prefix}countdown\` will display the same message.\nIf you would like to disable the daily countdown, type  \`${config.prefix}reset\`, which will still allow users to use the manual countdown command.\nPlease ensure the bot has permission to embed links and send messages to the countdown channel.\nIf you like this bot, please upvote it at ${config.dbl} and share it with your friends :)\nThanks,\n-<@319467558166069248>`);
   const embed = new Discord.RichEmbed()
  .setTitle("Countdown Bot > Help")
  .setDescription(`Counting down for ${client.users.size} users in ${client.guilds.size} guilds.`)
  .setColor(0x009999)
  .addField(`${prefix}ping`, `Displays the latency`)
  .addField(`${prefix}website`, `Displays live countdown link`)
  .addField(`${prefix}countdown`, `Shows how many days until Christmas`)
  .addField(`${prefix}channel`, `Set the channel you want the countdown to use`)
  .addField(`${prefix}reset`, `Reset settings & disable daily countdown`)
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
  guild.owner.send({embed});
});

client.on("guildDelete", guild => {
  try {
    db.delete(guild.id)
    guild.owner.send(`**»** Settings for \`${guild.name}\` (\`${guild.id}\`) has been removed from the database.`)
  } catch(error){
    return;
  }

});


client.on('message', async message => {
  if(!message.startsWith(config.prefix)) { return; }
  if(message.author.bot) return;
  if(message.channel.type !== `text`) { return; }
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Commands start here
if(command === 'ping') {
  if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
  try{
// ACTION
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
  message.channel.send({embed})
  message.channel.stopTyping()
} catch(e){
 return;
}
} else{
 message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
}

} else
if (command === 'help') {
  if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
  try{
// ACTION
const embed = new Discord.RichEmbed()
.setTitle("Countdown Bot > Help")
.setDescription(`Counting down for ${client.users.size} users in ${client.guilds.size} guilds.`)
.setColor(0x009999)
.addField(`${prefix}ping`, `Displays the latency`)
.addField(`${prefix}website`, `Displays live countdown link`)
.addField(`${prefix}countdown`, `Shows how many days until Christmas`)
.addField(`${prefix}channel`, `Set the channel you want the countdown to use`)
.addField(`${prefix}reset`, `Reset settings & disable daily countdown`)
.setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
message.channel.send({embed});
} catch(e){
 return;
}
} else{
 message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
}

} else
if (command === 'countdown') {
 if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
   try{
  const embed = new Discord.RichEmbed()
  .setTitle(`${daysleft()} days to Christmas`)
  .setURL(`${config.website}?utm_source=discord`)
  .setDescription(`\nThere are **${daysleft()}** days until Christmas! \n\nCountdown to Christmas live at [countdowntoxmas.tk](${config.website}?utm_source=discord). \n${xmasmsg()}\n`)
  .setColor(0xD60028)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
  message.channel.send({embed});
} catch(e){
  return;
}
} else{
  message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
  const embed = new Discord.RichEmbed()
  .setTitle(`${daysleft()} days to Christmas`)
  .setURL(`${config.website}`)
  .setDescription(`\nThere are **${daysleft()}** days until Christmas! \n\nCountdown to Christmas live at [countdowntoxmas.tk](${config.website}?utm_source=discord). \n${xmasmsg()}\n`)
  .setColor(0xD60028)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
  message.member.send({embed});
}
} else
if (command === 'channel') {
  if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
  try{
// ACTION
if (!message.member.hasPermission("MANAGE_GUILD")) {
// return  message.channel.send(":x: Error: `You don't have the required permission! (MANAGE_GUILD)`");
  const embed = new Discord.RichEmbed()
  .setTitle(`:x: Error`)
  .setDescription(`You need \`MANAGE_GUILD\` permission to set the countdown channel.`)
  .setColor(0xBB0000)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
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
.setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
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
.setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
message.channel.send({embed});
} catch(e){
 return;
}
} else{
 message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
}

} else
if (command === 'website') {
  if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
  try{
// ACTION
const embed = new Discord.RichEmbed()
.setTitle("Countdown Bot > Website")
.setURL(`${config.website}`)
.setDescription(`Countdown to Christmas live at [countdowntoxmas.tk](${config.website})`)
.setColor(0x009999)
.setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
message.channel.send({embed});
} catch(e){
 return;
}
} else{
 message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
}

} else
if (command === 'reset') {
  if(message.channel.permissionsFor(message.channel.guild.me).has('SEND_MESSAGES') && message.channel.permissionsFor(message.channel.guild.me).has('EMBED_LINKS')){
  try{
// ACTION
if (!message.member.hasPermission("MANAGE_GUILD")) {
// return  message.channel.send(":x: Error: `You don't have the required permission! (MANAGE_GUILD)`");
  const embed = new Discord.RichEmbed()
  .setTitle(`:x: Error`)
  .setDescription(`You need \`MANAGE_GUILD\` permission to set the countdown channel.`)
  .setColor(0xBB0000)
  .setTimestamp()
  .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
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
.setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/assets/img/logo.png`)
message.channel.send({embed});
} catch(e){
 return;
}
} else{
 message.member.send(`Sorry, looks like I don't have permission to respond in that channel.`)
}

} //else
// if (command === 'test') {
  // let channel = db.get(`${message.guild.id}.countdownchannel`);
  // message.channel.send(channel)
  // client.channels.get(channel).send(`:white_check_mark: Success!`);

  // Commands end here
});


client.login(config.token);
