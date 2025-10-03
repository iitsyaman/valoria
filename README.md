# 🚀 VALORIA

<div align='center'>
  <img alt="Valoria logo" src="https://res.cloudinary.com/dcwnn9c0u/image/upload/v1759439118/iqlkpm8s1npsrysgljm8.png" height="150"/>
</div>

<div align='center'>
Valoria - A modern, powerful TypeScript library for the WhatsApp Web API

<div align='center'>
[YaMaN]

## ✨ Introduction

**Valoria** is a modern, lightweight, and feature-rich TypeScript library that enables seamless interaction with the WhatsApp Web API. Built with performance and developer experience in mind, Valoria provides a clean and intuitive interface for building WhatsApp bots, automation tools, and messaging applications.

Unlike browser-automation based approaches (like Selenium or Puppeteer), Valoria connects directly to WhatsApp Web over WebSocket, which delivers:

- 🚫 **No Browser Required** — no headless browser needed
- 💾 **Memory Efficient** — saves ~500MB or more compared to browser-based solutions
- ⚡ **Fast & Reliable** — direct WebSocket communication for instant updates
- 🔒 **Type-safe** — built in TypeScript for excellent IDE support and types
- 🏭 **Production Ready** — well-tested and actively maintained

---

## 📦 Installation

Install Valoria with your preferred package manager.

### Using npm
```bash
npm install @iitsyaman/valoria
```

### Using yarn
```bash
yarn add @iitsyaman/valoria
```

### Using pnpm
```bash
pnpm add @iitsyaman/valoria
```

---

## 🚀 Quick Start

```typescript
import makeWASocket from '@iitsyaman/valoria'

async function main() {
    const sock = makeWASocket({
        printQRInTerminal: true
    })

    sock.ev.on('connection.update', (update) => {
        const { connection } = update
        if (connection === 'open') {
            console.log('✅ Connected successfully!')
        }
    })

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const message = messages[0]
        if (!message.message) return

        console.log('📩 New message:', message)

        await sock.sendMessage(message.key.remoteJid, {
            text: 'Hello! This is Valoria replying to you.'
        })
    })
}

main()
```

---

## 🎯 Core Features


| Feature | Description | Status |
|---|---|:---:|
| 🔌 No Browser Required | Direct WebSocket connection (no headless browser) | ✅ |
| 💾 Memory Efficient | Saves 500MB+ of RAM compared to browser solutions | ✅ |
| 📱 Multi-Device Support | Full WhatsApp multi-device support | ✅ |
| ⚡ Real-Time Events | Instant message & presence updates | ✅ |
| 🔐 Secure Auth | Built-in authentication handling | ✅ |
| 📦 Session Continuity | Save & restore login sessions | ✅ |
| 🤖 AI Message Icon | Display AI-branded bot messages | ✅ |
| 🔒 Local HKDF Encryption | 100% local session encryption | ✅ |

---


---

## 📨 Message Types Supported


| Message Type | Description | Status |
|---|---|:---:|
| 📝 Text Messages | Send & receive plain text messages | ✅ |
| 🖼️ Media Messages | Images, video, audio, documents, stickers | ✅ |
| 🔗 Link Previews | Automatic link preview generation | ✅ |
| 📍 Location Sharing | Send & receive location data | ✅ |
| 👥 Contact Cards | Share contact vCards | ✅ |
| ↩️ Quoted Replies | Quote and reply to messages | ✅ |
| 🤖 AI Messages | Messages with an AI icon | ✅ |

---


---

## 🎮 Interactive Features


| Feature | Description | Status |
|---|---|:---:|
| 🔘 Button Messages | Create interactive button messages | ✅ |
| 📋 List Messages | Multi-section selectable lists | ✅ |
| 🎨 Templates | Pre-built message templates | ✅ |
| ✅ Reactions | React to messages with emojis | ✅ |
| 📊 Polls | Create and manage polls | ✅ |

---


---

## 📰 Newsletter Management


| Feature | Description | Status |
|---|---|:---:|
| 📬 Subscribe/Unsubscribe | Manage newsletter follows | ✅ |
| 📢 Broadcast | Send messages to distribution lists | ✅ |
| 🔕 Mute/Unmute | Control newsletter notifications | ✅ |
| ✏️ Create & Update | Full newsletter management | ✅ |
| 📊 Analytics | Track views and engagement | ✅ |

---


Detailed newsletter example usage is supported by helper methods (see API area below).

---

## 🔐 Authentication


To avoid re-scanning QR on every start, save auth state:

```typescript
import makeWASocket, { useMultiFileAuthState } from '@iitsyaman/valoria'

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_valoria')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    return sock
}

connect()
```

### Custom Pairing Example

```javascript
if (usePairingCode && !sock.authState.creds.registered) {
    const phoneNumber = await question('Please enter your mobile phone number:\n')
    const custom = "VALORIA1" // must be 8 characters (letters/numbers)
    const code = await sock.requestPairingCode(phoneNumber, custom)
    console.log(`Pairing code: ${code?.match(/.{1,4}/g)?.join('-') || code}`)
}
```

---

## 💬 Sending Messages

```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    text: 'Hello from Valoria!'
})
```

### AI Messages with AI Icon
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    text: "Hello! I'm your AI assistant.",
    ai: true // show AI icon with the message
})
```

### Mentions
```typescript
await sock.sendMessage('groupid@g.us', {
    text: 'Hello @1234567890',
    mentions: ['1234567890@s.whatsapp.net']
})
```

### Image Message
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    image: { url: './path/to/image.jpg' },
    caption: 'Check out this image!'
})

// Or from URL
await sock.sendMessage('1234567890@s.whatsapp.net', {
    image: { url: 'https://example.com/image.jpg' },
    caption: 'Image from URL'
})
```

### Video Message
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    video: { url: './video.mp4' },
    caption: 'Awesome video!',
    gifPlayback: false, // set true to play as GIF
    ptv: false // set true for PTV (round video)
})
```

### Audio Message
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    audio: { url: './audio.mp3' },
    mimetype: 'audio/mp4',
    ptt: true // true for push-to-talk voice note
})
```

### Document Message
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    document: { url: './document.pdf' },
    mimetype: 'application/pdf',
    fileName: 'important-document.pdf'
})
```

### Reply to a Message (Quoted)
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    text: 'This is a reply',
    quoted: message // message object to quote
})
```

### React to a Message
```typescript
await sock.sendMessage('1234567890@s.whatsapp.net', {
    react: {
        text: '❤️',
        key: message.key
    }
})

// Remove reaction
await sock.sendMessage('1234567890@s.whatsapp.net', {
    react: {
        text: '',
        key: message.key
    }
})
```

---

## 🎮 Interactive Messaging Examples

```typescript
const buttons = [
    { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
    { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    text: "Hi it's a button message",
    footer: 'Powered by Valoria',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

### Image Buttons
```typescript
const buttons = [
    { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
    { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    image: { url: "https://example.com/abcd.jpg" }, // or buffer / path
    caption: "Hi it's a button message with image",
    footer: 'Powered by Valoria',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

### Video Buttons
```typescript
const buttons = [
    { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
    { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 }
]

const buttonMessage = {
    video: { url: "https://example.com/abcd.mp4" },
    caption: "Hi it's a button message with video",
    footer: 'Powered by Valoria',
    buttons,
    headerType: 1,
    viewOnce: true
}

await sock.sendMessage(id, buttonMessage, { quoted: null })
```

### Advanced Interactive Messages
```typescript
const interactiveButtons = [
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Quick Reply",
             id: "ID"
        })
     },
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "Tap Here!",
             url: "https://www.example.com/"
        })
     },
     {
        name: "cta_copy",
        buttonParamsJson: JSON.stringify({
             display_text: "Copy Code",
             id: "12345",
             copy_code: "12345"
        })
     }
]

const interactiveMessage = {
    text: "Hello World!",
    title: "This is the title",
    footer: "This is the footer",
    interactiveButtons
}

await sock.sendMessage(id, interactiveMessage, { quoted: null })
```

### Rich Media Interactive Messages (Image/Video)
```typescript
const interactiveButtons = [
     {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
             display_text: "Quick Reply",
             id: "ID"
        })
     },
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "Visit Website",
             url: "https://www.example.com/"
        })
     }
]

// Image
const imageInteractiveMessage = {
    image: { url: "https://example.com/abcd.jpg" },
    caption: "Check out this amazing photo!",
    title: "Photo Showcase",
    footer: "Tap a button below",
    interactiveButtons
}

await sock.sendMessage(id, imageInteractiveMessage, { quoted: null })

// Video
const videoInteractiveMessage = {
    video: { url: "https://example.com/abcd.mp4" },
    caption: "Watch this awesome video!",
    title: "Video Showcase",
    footer: "Tap a button below",
    interactiveButtons
}

await sock.sendMessage(id, videoInteractiveMessage, { quoted: null })
```

---

## 🤖 AI Messaging

Add an AI icon to messages by setting `ai: true`:

```typescript
// Simply add "ai: true" to display AI icon with your message
await sock.sendMessage(id, { text: "Hello! I'm your AI assistant.", ai: true })
```

**Pro tip:** AI icons help your bot messages stand out to users and clearly indicate automated responses.

---

## 🛠️ Quick Implementation Guide

- **Step 1: Install**
  ```bash
  npm install @iitsyaman/valoria
  ```

- **Step 2: Import**
  ```typescript
  import makeWASocket from '@iitsyaman/valoria'
  ```

- **Step 3: Configure**
  ```javascript
  const sock = makeWASocket({...})
  ```

- **Step 4: Implement**
  ```javascript
  await sock.sendMessage(id, {...})
  ```

---

## 🐛 Reporting Issues

If you find a bug or have suggestions, please open a new issue on GitHub:

- Open a new issue: https://github.com/iitsyaman/valoria/issues

Our team actively monitors issues and responds.

---

## 🔒 Security & Encryption

Valoria handles encryption locally and securely:

- ✅ HKDF-SHA256 for key derivation
- ✅ AES-256-GCM for encryption
- ✅ 100% local — no external libraries required
- ✅ Secure and production-ready

---

## 📚 Examples

```typescript
import makeWASocket, { useMultiFileAuthState } from '@iitsyaman/valoria'

async function echoBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_echo_bot')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text = msg.message.conversation ||
                     msg.message.extendedTextMessage?.text

        if (text) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: `Echo: ${text}`
            })
        }
    })
}

echoBot()
```

### AI Auto-Reply Bot
```typescript
import makeWASocket, { useMultiFileAuthState } from '@iitsyaman/valoria'

async function aiBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_ai_bot')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })

    sock.ev.on('creds.update', saveCreds)

    const replies = {
        'hello': 'Hi! How can I help you?',
        'help': 'Send "info" for more information.',
        'info': 'This is an auto-reply bot powered by Valoria!'
    }

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text = (msg.message.conversation ||
                      msg.message.extendedTextMessage?.text || '').toLowerCase()

        const reply = replies[text]
        if (reply) {
            await sock.sendMessage(msg.key.remoteJid, {
                text: reply,
                ai: true
            })
        }
    })
}

aiBot()
```

---

## 📡 Event Handling

Valoria exposes a rich event system:

- `connection.update` — connection status changes (open/close)
- `messages.upsert` — new messages
- `messages.update` — message delivery/read updates
- `messages.delete` — message deletions
- `groups.update` — group updates
- `group-participants.update` — participant changes (add/remove/promote/demote)

Example connection handling:

```typescript
sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
        console.log('QR code:', qr)
    }

    if (connection === 'close') {
        console.log('Connection closed. Reconnecting...')
        // implement reconnection logic
    }

    if (connection === 'open') {
        console.log('Connected!')
    }
})
```

---

## 🔥 Advanced Features


| Feature | Description | Status |
|---|---|:---:|
| 👥 Group Management | Create/edit/manage groups and participants | ✅ |
| 📢 Broadcast Messaging | Send messages to multiple recipients | ✅ |
| 💼 Business API | Business profile & catalog features | ✅ |
| ✉️ Read Receipts | Track delivery & read status | ✅ |
| 🔔 Presence Updates | Monitor online/offline presence | ✅ |

---


---

## 🔧 Troubleshooting

```typescript
// Ensure printQRInTerminal is enabled
const sock = makeWASocket({
    printQRInTerminal: true
})
```

### Changes not visible
- Ensure the connection is open
- Restart the bot
- Clear cache if needed

### Connection problems
```typescript
sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
        if (shouldReconnect) {
            // Reconnect
            connect()
        }
    }
})
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write tests for new features
- Update documentation when necessary
- Ensure all tests pass before submitting

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- Thanks to all contributors
- Built on top of strong WhatsApp Web API foundations
- Special thanks to the developer community

---

## 📞 Support

- 📧 Email: [support@valoria.dev](mailto:support@valoria.dev)
- 🐛 Report issues: https://github.com/iitsyaman/valoria/issues
- 💬 Community: https://discord.gg/valoria
- 📖 Docs: https://docs.valoria.dev

---

<div align='center'>
<b>Made with ❤️ by the Valoria community</b>
</div>
