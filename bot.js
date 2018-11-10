const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('quick.db');
const prefix = config.prefix;

let today=new Date();
var xmas=new Date(today.getFullYear(), 11, 24);
if (today.getMonth()==11 && today.getDate()>24){ xmas.setFullYear(xmas.getFullYear()+1);}
var one_day=1000*60*60*24;
let daysleft = Math.ceil((xmas.getTime()-today.getTime())/(one_day));
let xmasmsg = "";
if (daysleft == 1) {let xmasmsg="It's Christmas Eve!";}
if (daysleft < 1) {let xmasmsg=":snowflake: **Merry Christmas!** :snowflake:";}

let now = today.getHours();

client.on('ready', () => {
  console.log(`CountdownToXMAS Bot\nConnected as ${client.user.tag}\nReady to countdown in ${client.guilds.size} servers for ${client.users.size} users...\n`);

  client.user.setPresence({ game: { name: `on ${config.website} | ${config.prefix}help` }, status: 'dnd' })
  .catch(console.error);
// console.log(now) // testing

// [AUTO] DAILY COUNTDOWN
setInterval(() => {

    if(now == 0 || now == 00){


      console.log(`There are ${daysleft} days left to Christmas!`);
      console.log(`  > Sending daily countdown to x channels...`);
  } else {
    return;
  }
      // db.all()
     }, 3600000) // 1 hour
  //}, 60000) // 1 min for testing purposes >>>>>> MUST CHANGE <<<<<<<
// END

});

client.on('message', async message => {
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
  .setDescription(`Serving ${client.users.size} users in ${client.guilds.size} guilds.`)
  .setColor(0x009999)
  .addField(`${prefix}ping`, `Displays the latency`)
  .addField(`${prefix}channel`, `Set the channel you want the countdown to use`)
  .addField(`${prefix}website`, `Displays link`)
  .addField(`${prefix}countdown`, `Shows how many days until Christmas`)
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
  if (!message.member.hasPermission("MANAGE_GUILD")) return  message.channel.send(":x: Error: `You don't have the required permission! (MANAGE_GUILD)`");

  /*
    const noperms = new Discord.RichEmbed()
    .setTitle(`:x: Error`)
    .setDescription(`You need \`MANAGE_GUILD\` permission to set the countdown channel.`)
    .setColor(0xBB0000)
    .setTimestamp()
    .setFooter(`CountdownToXMAS - Made by ${config.creator}`,`${config.website}/icon.png`)
    message.channel.send({noperms});
*/

  // if has perms
  let chan = message.mentions.channels.first();
  if (!chan) return message.channel.send(":x: Error: `You need to mention a channel.`");
  // DATABASE
  db.set(message.guild.id, { countdownchannel: chan.id });

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
if (command === 'test') {
  let channel = db.get(`${message.guild.id}.countdownchannel`);
  message.channel.send(channel)
}
  // Commands end here
});



// DAILY COUNTDOWN: START
//let channel = db.get(`${message.guild.id}.countdownchannel`);
// DAILY COUNTDOWN: END


client.login(config.token);
