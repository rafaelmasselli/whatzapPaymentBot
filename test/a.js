const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const dailyController = require("../controller/daily.controller");
const userController = require("../../controller/user.controller");
const LogicForAddingUserToRoom = require("../../utils/logicForAddingUserToRoom");

class WhatsAppDriver {
  constructor() {
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
      const contact = await this.client.getContactById(message.from);
      const user = await this.controllerUser.getUserPhoneNumber(
        contact.id.user
      );

      if (!user || user.length === 0) {
        this.startConversation = true;
        let contactName = contact.pushname || "Desconhecido";

        await this.controllerUser.createStartupUser(
          contactName,
          contact.id.user
        );
        return message.reply(this.dailyController.handleDailyMessage());
      }
      if (this.receivedTheRoom) {
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

      if (this.confirmationPayment) {
      }
      if (this.startConversation && !this.receivedTheRoom) {
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
    });

    this.client.initialize();

    console.log("Client is ready");
  }
}

module.exports = WhatsAppDriver;
