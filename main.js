//base by DGXeon (Xeon Bot Inc.)
//re-upload? recode? copy code? give credit ya :)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: @DGXeon
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon
//telegram channel: https://t.me/+WEsVdEN2B9w4ZjA9

require("./settings")
require("./doc/global");
const func = require("./doc/place");
const readline = require("readline");
const yargs = require('yargs/yargs');
const _ = require('lodash');
const usePairingCode = true;
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve);
    });
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const {
    Telegraf,
    Context,
    Markup
} = require('telegraf')
const {
    simple
} = require("./lib/myfunc")
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')
const axios = require('axios')
const chalk = require("chalk")
const o = fs.readFileSync(`./69/o.jpg`)
  
if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log("No token detected")
}
const { Client } = require('ssh2');
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

// File to store all user IDs
const usersFile = 'users.json';
// Ensure the users file exists
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}
async function saveUser(userId) {
    // Load existing users
    let users = [];
    if (fs.existsSync(usersFile)) {
        try {
            const data = fs.readFileSync(usersFile, 'utf8');
            users = JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error);
            users = [];
        }
    }

    // Check if the user already exists
    if (!users.includes(userId)) {
        users.push(userId); // Add the new user ID

        // Save the updated list of users
        try {
            fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
            console.log(`User ID ${userId} added to the users list.`);
        } catch (error) {
            console.error('Error writing to users file:', error);
        }
    }
}

let allUsers = JSON.parse(fs.readFileSync(usersFile));
const premium_file = 'lib/premium.json';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premium_file));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}

const bot = new Telegraf(BOT_TOKEN)

async function startXeony() {
    bot.on('callback_query', async (XeonBotInc) => {
        // Split the action and extract user ID
        const action = XeonBotInc.callbackQuery.data.split(' ');
        const user_id = Number(action[1]);

        // Check if the callback is from the correct user
        if (XeonBotInc.callbackQuery.from.id !== user_id) {
            return XeonBotInc.answerCbQuery('Oof! this button is not for you!', {
                show_alert: true
            });
        }

        const timestampi = speed();
        const latensii = speed() - timestampi;
        const user = simple.getUserName(XeonBotInc.callbackQuery.from);
        const pushname = user.full_name;
        const username = user.username ? user.username : "DGXeon";
        const isCreator = [XeonBotInc.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(username);
        
        const reply = async (text) => {
            for (let x of simple.range(0, text.length, 4096)) { // Split text to avoid overflow
                await XeonBotInc.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                });
            }
        };
        
        try {
            switch (action[0]) {
  
            }
        } catch (e) {
            console.log(e)
        }
    })        
    bot.command('start', async (XeonBotInc) => {
    let user = simple.getUserName(XeonBotInc.message.from);
    await XeonBotInc.reply(lang.first_chat(BOT_NAME, user.full_name), {
        parse_mode: "MarkdownV2", // Updated to "MarkdownV2"
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'OWNER 🦄',
                    url: "https://t.me/DGXeon"
                }, {
                    text: 'CHANNEL 🤙',
                    url: "https://t.me/+WEsVdEN2B9w4ZjA9"
                }]
            ]
        }
    });
});

bot.command('listprem', async (XeonBotInc) => {
    const isOwner = global.DEVELOPER.includes(XeonBotInc.message.from.id.toString());
    if (!isOwner) {
        return XeonBotInc.reply(`You are not authorized to use this command.\nPlease dm ${OWNER_NAME} for buy.`);
    }
    try {
        const adminList = premiumUsers.length > 0 ? premiumUsers.join('\n') : "No admins found.";
        await XeonBotInc.reply(`👮 Premium List:\n${adminList}`);
    } catch (error) {
        console.error('Error listing admins:', error);
        XeonBotInc.reply('Error listing premium users.');
    }
});

bot.command('addprem', async (XeonBotInc) => {
    const isOwner = global.DEVELOPER.includes(XeonBotInc.message.from.id.toString());
    if (!isOwner) {
        return XeonBotInc.reply(`You are not authorized to use this command.\nPlease dm ${OWNER_NAME} for buy.`);
    }
    const text = XeonBotInc.message.text.split(' ');
    if (text.length < 2) {
        return XeonBotInc.reply("Please provide the user ID to add as premium user.\nUsage: `/addprem <user_id>`", { parse_mode: "Markdown" });
    }
    const newAdmin = text[1];
    if (premiumUsers.includes(newAdmin)) {
        return XeonBotInc.reply("This user is already a premium user.");
    }
    try {
        premiumUsers.push(newAdmin);
        fs.writeFileSync(premium_file, JSON.stringify(premiumUsers, null, 2));
        XeonBotInc.reply(`✅ User ${newAdmin} added as admin.`);
    } catch (error) {
        console.error('Error adding user as premium:', error);
        XeonBotInc.reply('Error adding user as premium.');
    }
});

bot.command('delprem', async (XeonBotInc) => {
    const isOwner = global.DEVELOPER.includes(XeonBotInc.message.from.id.toString());
    if (!isOwner) {
        return XeonBotInc.reply(`You are not authorized to use this command.\nPlease dm ${OWNER_NAME} for buy.`);
    }
    const text = XeonBotInc.message.text.split(' ');
    if (text.length < 2) {
        return XeonBotInc.reply("Please provide the user ID to remove as premium user.\nUsage: `/delprem <user_id>`", { parse_mode: "Markdown" });
    }
    const adminToRemove = text[1];
    if (!premiumUsers.includes(adminToRemove)) {
        return XeonBotInc.reply("This user is not a premium user.");
    }
    try {
        premiumUsers = premiumUsers.filter((id) => id !== adminToRemove);
        fs.writeFileSync(premium_file, JSON.stringify(premiumUsers, null, 2));
        XeonBotInc.reply(`✅ User ${adminToRemove} removed from admins.`);
    } catch (error) {
        console.error('Error removing premium user:', error);
        XeonBotInc.reply('Error removing premium user.');
    }
});

bot.command('broadcast', async (XeonBotInc) => {
    const isOwner = global.DEVELOPER.includes(XeonBotInc.from.id.toString());
    if (!isOwner) {
        return XeonBotInc.reply(`You are not authorized to use this command.\nPlease dm ${OWNER_NAME} for buy.`);
    }

    const cmdParts = XeonBotInc.message.text.split(' ');
    if (cmdParts.length < 2) {
        return XeonBotInc.reply("Please provide a message to broadcast.\nUsage: `/broadcast <message>`", { parse_mode: 'Markdown' });
    }

    // Join all parts after the command to form the full broadcast message
    const broadcastMessage = cmdParts.slice(1).join(' ');
    const allRecipients = Array.from(new Set([...allUsers, ...premiumUsers])); // Combine all users and premium users, remove duplicates

    let successCount = 0;
    let failedCount = 0;

    for (const userId of allRecipients) {
        try {
            // Check if the user is reachable
            const chat = await XeonBotInc.telegram.getChat(userId);
            if (chat) {
                await XeonBotInc.telegram.sendMessage(userId, broadcastMessage, { parse_mode: 'Markdown' });
                successCount++;
            }
        } catch (err) {
        }
    }

    XeonBotInc.reply(`Broadcast completed.\n✅ Success: ${successCount}\n`);
});

bot.command('checkid', (XeonBotInc) => {
    const sender = XeonBotInc.from.username || "User";
    const text12 = `Hi @${sender} 👋
    
👤 From ${XeonBotInc.from.id}
  └🙋🏽 You
  
Your ID Telegram : ${XeonBotInc.from.id}
Your Full Name : @${sender}

🙏🏼 Excuse me, the bot will leave automatically.
Developer : @DGXeon`;

    // Sending text messages without an interactive keyboard
    XeonBotInc.reply(text12, { parse_mode: 'Markdown' });
});
           
    bot.on('message', async (XeonBotInc) => {
        require("./XeonTele2")(XeonBotInc, bot)
        const userId = XeonBotInc.from.id; // Get the user's ID
    await saveUser(userId); // Save the user ID
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/DGXeon"
        })
    })
    
    process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
async function XeonSession() {
	return new Promise(async (resolve, reject) => {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const getMessage = async (key) => {
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
            return msg?.message || undefined;
        }
        return { conversation: 'WHATSAPP' };
    };

    const connectionOptions = {
        isLatest,
        getMessage,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "fatal" }),
        auth: state,
        browser: ['Ubuntu', 'Chrome', '20.0.04']
    };

    const XeonBotInc = func.makeWASocket(connectionOptions);

    if (usePairingCode && !XeonBotInc.authState.creds.registered) {

const botnumber = await question(chalk.green.bold(`







please enter your bot number, for example: +916909137213:                               
                                                                           
        




`));
 {
console.log(chalk.blue.bold(`🦄 YOUR NUMBER IS CONNECTED SUCCEFUL\n`))
await sleep(1500)
const code = await XeonBotInc.getPairingCode(botnumber.trim())
console.log(chalk.green.bold(`[ Your WhatsApp Pair Code ] ${code}`))
}}
    
store.bind(XeonBotInc.ev)

XeonBotInc.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
XeonBotInc.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
XeonBotInc.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await XeonSession()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
XeonSession()
}
        } else if (connection === "connecting") {
            console.log(chalk.blue.bold(`Connecting...`));
        } else if (connection === "open") {
console.log(chalk.blue.bold(`Connected to ${XeonBotInc.user.id.split(":")[0]}`));
            XeonBotInc.sendMessage("916909137213@s.whatsapp.net", { text: `🦄 Telegram bot connected!!` });
            resolve(XeonBotInc);
        }
    });
    
    XeonBotInc.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            let m = chatUpdate.messages[0];
            if (!m.message) return;
            m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message;
            if (m.key && m.key.remoteJid === 'status@broadcast') return XeonBotInc.readMessages([m.key]);
            if (!XeonBotInc.public && m.key.remoteJid !== global.owner + "@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') return;
            if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return;
            if (global.autoread) XeonBotInc.readMessages([m.key]);
            m = func.smsg(XeonBotInc, m, store);
            require("./server.js")(XeonBotInc, m, store);
        } catch (err) {
            console.log(err);
        }
    });

    
    XeonBotInc.public = true;

    XeonBotInc.ev.on('creds.update', saveCreds);
    return XeonBotInc;
    });
}


// Main Logic
(async () => {
    try {
        console.log("Connecting to WhatsApp...");
        await XeonSession();
        console.log("WhatsApp connected! Starting Telegram bot...");
        await startXeony();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
})();
