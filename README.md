## WhatsApp Bot Project

### Description

BotW is a WhatsApp bot project built using the whatsapp-web.js library. It allows users to interact with the bot to perform various tasks, including room selection, daily messages, and more.

### Features

- Room Selection: Users can choose specific rooms by responding to the bot's prompts.
- Daily Messages: Users receive daily messages containing relevant information.
- Payment Confirmation: Logic for handling payment confirmations.

### Getting Started

#### Prerequisites

- Node.js installed on your machine
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone git@github.com:rafaelmasselli/whatzapPaymentBot.git
```

2. Navigate to the project directory:

```bash
cd whatzapPaymentBot

```

3. Install dependencies:

```bash
npm install
```

### Usage

1.  Start the bot using the following command:

```bash
npm start
```

2.  Scan the QR code displayed in the console using your WhatsApp mobile app to authenticate the bot.

3.  Interact with the bot by responding to its prompts.

### Dependencies

- express: Web framework for handling HTTP requests (version 4.18.2)
- nodemon: Development tool for automatically restarting the server (version 3.0.2)
- qrcode-terminal: Library for generating QR codes in the terminal (version 0.12.0)
- sqlite3: SQLite database driver (version 5.1.7)
  whatsapp-web.js: WhatsApp Web API library (version 1.23.0)
