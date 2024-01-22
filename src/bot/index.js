const whatsAppDriver = require("./drivers/whatsAppDriver");

const driverBot = new whatsAppDriver();

function inicializeBotWhatsAppDriver() {
  driverBot.setup();
}

module.exports = inicializeBotWhatsAppDriver;
