//base by DGXeon (Xeon Bot Inc.)
//re-upload? recode? copy code? give credit ya :)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: @DGXeon
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon
//telegram channel: https://t.me/+WEsVdEN2B9w4ZjA9

const fs = require("fs");
const chalk = require("chalk")

global.BOT_TOKEN = "TOKEN"
global.BOT_NAME = "botku" //your bot name
global.OWNER_NAME = "@DGXeon" //your name with sign @
global.OWNER = ["https://t.me/+WEsVdEN2B9w4ZjA9", "https://youtube.com/@dgxeon?si=Ogk_T5DMcDjTQjNF"] // Make sure the username is correct so that the special owner features can be used.
global.DEVELOPER = ["5994506810"] //developer telegram id to operate addprem delprem and listprem
global.pp = 'https://i.ibb.co/Jj0n5zV/thumb.jpg' //your bot pp

global.owner = global.owner = ['6288888888'] //owner whatsapp

const {
   english
} = require("./lib");
global.language = english
global.lang = language

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})