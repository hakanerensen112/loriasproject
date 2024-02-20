const { Intents, Collection, Client, Discord, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); 
const ayarlar = ("./config.json")



client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;
  let command = message.content.split(" ")[0].slice("!".length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
  

})

client.on("message", message => {
    if (message.content === "!regbutton") {
    

    if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply("you dont have permission for that command")
        return
    }
    const regbutton = new MessageActionRow()
        .addComponents(
        new MessageButton()
            .setCustomId("buton1")
            .setLabel("Register")
            .setStyle("SUCCESS")
        )
    const embed = new MessageEmbed()
        .setTitle("Welcome To LoriasProject")
        .setDescription("We are happy to see you, To register you just have to press the button below this message. Enjoy!")
        .setColor("GREEN")
        
message.channel.send({ embeds: [embed], components: [regbutton]}) 

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	if (interaction.customId === "buton1") {
	    interaction.member.roles.add("1205244178800312367");
const kullanici = interaction.user.username
const userId = interaction.user.id
	    client.users.send(userId, "Role added successfully")
	    console.log(`${kullanici} adli isi kayit oldu`)
	}
});

  
}
})


client.on("ready", () => {
  console.log(`Bütün komutlar yüklendi, bot çalıştırılıyor...`);
  console.log(`${client.user.username} ismi ile Discord hesabı aktifleştirildi!`);
  console.log(`Durum ayarlandı: ${ayarlar.onlinemode}`)
client.user.setPresence({ activity: { name: ayarlar.onlinemode,type:2 }, status: ayarlar.bio })
  console.log(`Oynuyor ayarlandı!`);
})


const fs = require("fs");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
//if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
//  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  //if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
//  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6  if(message.author.id === message.guild.ownerID) permlvl = 7  if(message.author.id === client.conf.own) permlvl = 8  return permlvl;
};

///DOKUNMA





client.login("MTIwODQ3MDgxOTUyNTg5NDE2NA.GMWpVm.qgqRQFiiadXPomCpxOwWfB-JOy7v1naGCsoZVw")


