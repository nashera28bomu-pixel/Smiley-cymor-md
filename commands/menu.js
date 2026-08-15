const settings = require('../settings.js');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 5) return 'Burning the midnight oil 🌙';
    if (hour < 12) return 'Good morning ☀️';
    if (hour < 17) return 'Good afternoon 🌤️';
    if (hour < 21) return 'Good evening 🌆';
    return 'Good night 🌙';
}

async function menuCommand(sock, chatId, message) {
    try {
        const uptimeFormatted = formatTime(process.uptime());
        const greeting = getGreeting();
        const prefix = '.';

        const menuText = `
╭─❖ 「 ✨ *${settings.botName.toUpperCase()}* ✨ 」
│
│  ${greeting}
│  👑 *Owner:* ${settings.botOwner}
│  ⏱️ *Uptime:* ${uptimeFormatted}
│  🔖 *Version:* v${settings.version}
│  📡 *Mode:* ${settings.commandMode || 'public'}
│  🔣 *Prefix:* [ ${prefix} ]
╰────────────────────

┌──❖ 🤖 *AI & CHAT*
│ ${prefix}ai
│ ${prefix}chatbot
│ ${prefix}character
│ ${prefix}imagine
└────────────────────

┌──❖ ⚙️ *BOT & OWNER*
│ ${prefix}owner
│ ${prefix}pair
│ ${prefix}ping
│ ${prefix}alive
│ ${prefix}settings
│ ${prefix}setpp
│ ${prefix}staff
│ ${prefix}sudo
│ ${prefix}update
│ ${prefix}resetlink
│ ${prefix}autoread
│ ${prefix}autostatus
│ ${prefix}autotyping
│ ${prefix}clear
│ ${prefix}clearsession
│ ${prefix}cleartmp
└────────────────────

┌──❖ 🛡️ *GROUP PROTECTION*
│ ${prefix}antibadword
│ ${prefix}anticall
│ ${prefix}antidelete
│ ${prefix}antilink
│ ${prefix}antitag
│ ${prefix}pmblocker
│ ${prefix}warn
│ ${prefix}warnings
│ ${prefix}ban
│ ${prefix}unban
│ ${prefix}kick
│ ${prefix}mute
│ ${prefix}unmute
│ ${prefix}promote
│ ${prefix}demote
│ ${prefix}tagnotadmin
│ ${prefix}delete
└────────────────────

┌──❖ 👥 *GROUP TOOLS*
│ ${prefix}groupinfo
│ ${prefix}groupmanage
│ ${prefix}tag
│ ${prefix}tagall
│ ${prefix}hidetag
│ ${prefix}mention
│ ${prefix}topmembers
│ ${prefix}welcome
│ ${prefix}goodbye
│ ${prefix}goodnight
└────────────────────

┌──❖ 🎮 *GAMES & FUN*
│ ${prefix}tictactoe
│ ${prefix}hangman
│ ${prefix}trivia
│ ${prefix}truth
│ ${prefix}dare
│ ${prefix}eightball
│ ${prefix}quote
│ ${prefix}joke
│ ${prefix}insult
│ ${prefix}compliment
│ ${prefix}fact
│ ${prefix}flirt
│ ${prefix}simp
│ ${prefix}stupid
│ ${prefix}wasted
│ ${prefix}ship
│ ${prefix}emojimix
│ ${prefix}misc
│ ${prefix}pies
│ ${prefix}roseday
└────────────────────

┌──❖ 🎨 *STICKERS & MEDIA*
│ ${prefix}sticker
│ ${prefix}sticker-alt
│ ${prefix}stickercrop
│ ${prefix}stickertelegram
│ ${prefix}simage
│ ${prefix}img-blur
│ ${prefix}attp
│ ${prefix}textmaker
│ ${prefix}removebg
│ ${prefix}remini
│ ${prefix}take
│ ${prefix}viewonce
│ ${prefix}ss
└────────────────────

┌──❖ 📥 *DOWNLOADERS*
│ ${prefix}tiktok
│ ${prefix}instagram
│ ${prefix}facebook
│ ${prefix}spotify
│ ${prefix}song
│ ${prefix}video
│ ${prefix}url
│ ${prefix}sora
│ ${prefix}igs
│ ${prefix}play
│ ${prefix}lyrics
└────────────────────

┌──❖ 🌐 *SOCIAL & INFO*
│ ${prefix}github
│ ${prefix}news
│ ${prefix}weather
│ ${prefix}translate
│ ${prefix}anime
│ ${prefix}meme
│ ${prefix}gif
│ ${prefix}shayari
│ ${prefix}tts
└────────────────────

╭─❖ 
│ Type ${prefix}menu anytime to see this list again.
│ Built with ❤️ by ${settings.botOwner}
╰────────────────────
`.trim();

        await sock.sendMessage(chatId, { text: menuText }, { quoted: message });

    } catch (error) {
        console.error('Error in menu command:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to load menu.' });
    }
}

module.exports = menuCommand;
