# 🤖 Smiley Cymor MD

A multi-device WhatsApp bot built on the [Baileys](https://github.com/WhiskeySockets/Baileys) library, developed by **Cymor Tech Services** (Nairobi, Kenya). It handles group management, media/downloader tools, fun & games, AI features, and admin utilities — all from a single always-on WhatsApp number.

Owner: **Legendary Smiley Cymor**

---

## ✨ Features

**Group Management**
`tagall` `hidetag` `tagnotadmin` `mute` `unmute` `kick` `ban` `unban` `promote` `demote` `warn` `warnings` `welcome` `goodbye` `groupinfo` `groupmanage` `staff` `topmembers` `antilink` `antitag` `antibadword` `anticall` `antidelete` `pmblocker` `clear` `clearsession` `cleartmp` `resetlink` `settings` `sudo`

**AI & Chat**
`ai` `chatbot` `imagine` `sora` `translate`

**Media & Downloaders**
`play` `song` `video` `tiktok` `instagram` `facebook` `spotify` `ss` `img-blur` `removebg` `remini` `viewonce`

**Stickers & Images**
`sticker` `sticker-alt` `stickercrop` `stickertelegram` `attp` `take` `textmaker` `simage` `emojimix`

**Fun & Games**
`tictactoe` `hangman` `truth` `dare` `eightball` `insult` `compliment` `flirt` `simp` `ship` `wasted` `character` `quote` `fact` `joke` `meme` `gif` `roseday` `goodnight` `shayari` `lyrics` `trivia` `stupid` `news` `weather`

**Utilities**
`ping` `alive` `menu` `help` `owner` `pair` `setpp` `github` `update` `autoread` `autostatus` `autotyping` `misc` `mention`

> Full command list is generated dynamically via `.menu` / `.help` once the bot is running.

---

## 🧱 Tech Stack

- **Runtime:** Node.js ≥ 18
- **WhatsApp connection:** `@whiskeysockets/baileys` (multi-device, pairing-code login)
- **Session storage:** lightweight JSON-based persisted store (`lib/lightweight_store.js`) — no external DB required
- **Media processing:** `sharp`, `jimp`, `fluent-ffmpeg`, `node-webpmux`
- **Downloads:** `ytdl-core`, `yt-search`, `ruhend-scraper`
- **Memory safety:** built-in RAM watchdog (auto-restarts if usage exceeds ~400MB) and periodic garbage collection

---

## 🚀 Deployment

This bot is designed to be managed entirely from a mobile device via GitHub's web interface — no PC or terminal required.

### 1. Get the code onto GitHub
Upload the project zip to your repo root via **Add file → Upload files**, then run the **Extract Zip to Root** GitHub Action (`.github/workflows/extract-zip.yml`) from the **Actions** tab to unpack it into the repo root automatically.

### 2. Set your bot identity
Edit `settings.js`:

```js
const settings = {
  packname: 'Smiley Cymor MD',
  botName: 'Smiley Cymor MD',
  botOwner: 'Legendary Smiley Cymor',
  ownerNumber: '2547XXXXXXXX', // your WhatsApp number, no + or spaces
  commandMode: 'public',       // or 'private'
  ...
};
```

### 3. Deploy to a host (e.g. Render)
- Create a new **Background Worker** or **Web Service** on Render, connected to this GitHub repo.
- Build command: `npm install --legacy-peer-deps`
- Start command: `npm start`
- Add any required environment variables (see `.env` / `config.js` for third-party API keys).

> ⚠️ Free-tier hosts on shared datacenter IPs can occasionally trigger WhatsApp connection blocks. If pairing repeatedly fails, try re-pairing after a few minutes, or move to a host with a cleaner IP range.

### 4. Pair your WhatsApp number
On first boot, the bot will use **pairing-code login** (via the `ownerNumber` set in `settings.js`) instead of a QR code — enter the code shown in your host's logs into WhatsApp under **Linked Devices**.

Once linked, session credentials are stored under `/session` — keep this folder private and out of version control (already covered by `.gitignore`).

---

## 📂 Project Structure

```
Smiley-Cymor-MD/
├── commands/       # One file per bot command
├── data/           # Runtime JSON state (owner, warnings, bans, premium, etc.)
├── lib/            # Core helpers: auth checks, media conversion, anti-link/spam, store
├── session/        # WhatsApp auth credentials (generated after pairing)
├── config.js       # Third-party API endpoints & keys
├── settings.js     # Bot identity & runtime config
├── main.js         # Command router & message handler wiring
├── index.js        # Baileys socket bootstrap & connection lifecycle
└── package.json
```

---

## 🔐 Notes

- Never commit a populated `session/` folder or real API keys — treat them like passwords.
- `commandMode: "public"` lets anyone in a group use commands; switch to `"private"` to restrict to the owner/sudo list in `data/owner.json`.
- Add trusted numbers to `sudo` via the `.sudo` command to grant admin-level bot access without making them the owner.

---

Built and maintained by **Cymor Tech Services**.
