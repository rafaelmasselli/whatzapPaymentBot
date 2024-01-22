const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const dailyController = require("../controller/daily.controller");
const userController = require("../../controller/user.controller");
const LogicForAddingUserToRoom = require("../../utils/logicForAddingUserToRoom");

class WhatsAppDriver {
  constructor() {
    this.message = "";
    this.client = new Client();
    this.dailyController = new dailyController();
    this.controllerUser = new userController();
    this.setup();
    this.startConversation = false;
    this.confirmationPayment = false;
    this.receivedTheRoom = false;
    this.roomSearchError = false;
    this.rooms = [];
  }

  async setup() {
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
      console.log("Client is ready!!");
    });

    this.client.on("message", async (message) => {
      this.message = message;
      await this.handleUser(message);
    });

    this.client.initialize();

    console.log("Client is ready");
  }

  async handleUser(message) {
    const contact = await this.client.getContactById(message.from);
    const user = await this.controllerUser.getUserPhoneNumber(contact.id.user);

    if (!user || user.length === 0) {
      await this.handleNewUser(contact);
    } else if (this.receivedTheRoom) {
      await this.handleRoomConfirmation(message);
    } else if (this.confirmationPayment) {
      // Handle confirmation payment logic
    } else if (this.startConversation) {
      await this.handleRoomSelection(message);
    }
  }

  async handleNewUser(contact) {
    this.startConversation = true;
    const contactName = contact.pushname || "Desconhecido";
    await this.controllerUser.createStartupUser(contactName, contact.id.user);
    return this.message.reply(this.dailyController.handleDailyMessage());
  }

  async handleRoomConfirmation(message) {
    const lowerCaseMessage = message.body.toLowerCase();
    if (lowerCaseMessage === "sim" || lowerCaseMessage[0] === "s") {
      message.reply("Confirmado");
    } else if (
      lowerCaseMessage === "não" ||
      lowerCaseMessage === "nao" ||
      lowerCaseMessage[0] === "n"
    ) {
      message.reply("Negado");
    }
  }

  async handleRoomSelection(message) {
    const messageNumberRoom = message.body;
    const numbers = messageNumberRoom.match(/\d+/g);
    const resultLogicForAddingUserToRoom = new LogicForAddingUserToRoom(
      numbers
    ).inicialize();

    if (!resultLogicForAddingUserToRoom) {
      message.reply(
        this.dailyController.handleErrorWhenSendingRoomTimeMessage()
      );
    } else {
      message.reply(
        this.dailyController.handleRoomConfirmationMessage(
          resultLogicForAddingUserToRoom
        )
      );
    }

    this.receivedTheRoom = true;
  }
}

module.exports = WhatsAppDriver;
