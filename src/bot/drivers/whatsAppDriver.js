const qrcode = require("qrcode-terminal");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const { Client } = require("whatsapp-web.js");
const dailyController = require("../controller/daily.controller");
const userController = require("../../controller/user.controller");
const {
  LogicForAddingUserToRoom,
  findUserByPhoneNumber,
} = require("../../utils/");

class WhatsAppDriver {
  constructor() {
    this.id = "";
    this.number = "";
    this.message = "";
    this.twoHours = "";
    this.resultMessage = "";
    this.getTotalCost = "";
    this.client = new Client();
    this.dailyController = new dailyController();
    this.controllerUser = new userController();
    this.startConversation = false;
    this.confirmationPayment = false;
    this.receivedTheRoom = false;
    this.photoOfProofOfPayment = false;
    this.errorMessage = false;
    this.secondConfirmationMessage = false;
    this.rooms = [];

    this.setup();
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

  async handleUser() {
    const contact = await this.client.getContactById(this.message.from);
    const users = await this.controllerUser.getUserPhoneNumber(contact.id.user);

    if (!users || users.length === 0) {
      await this.#handleNewUser(contact);
    } else {
      if (this.id == "" || this.id == null) {
        this.id = findUserByPhoneNumber(contact.id.user);
      }
      if (this.photoOfProofOfPayment) await this.#handleProofOfPayment();
      else if (this.errorMessage) await this.#handleRoomSelection();
      else if (this.startConversation) await this.#handleRoomSelection();
      else if (this.receivedTheRoom) await this.#handleRoomConfirmation();
      else await this.#handleInvalidInput();
    }
  }

  async #handleNewUser(contact) {
    const contactName = contact.pushname || "Desconhecido";
    this.number = contact.id.user;
    await this.controllerUser
      .createStartupUser(contactName, contact.id.user)
      .then(async () => {
        this.startConversation = true;
      });
    return await this.message.reply(this.dailyController.handleDailyMessage());
  }

  async #handleRoomConfirmation() {
    const disableFunctions = async () => {
      this.errorMessage = false;
      this.startConversation = false;
      this.secondConfirmationMessage = false;
      this.receivedTheRoom = false;
    };

    const lowerCaseMessage = await this.message.body.toLowerCase();
    if (lowerCaseMessage === "sim") {
      await this.message.reply(
        this.dailyController.handlePixKeyAfterConfirmation()
      );
      await disableFunctions();
      this.photoOfProofOfPayment = true;
    } else if (lowerCaseMessage === "não" || lowerCaseMessage === "nao") {
      await this.message.reply("Negado");
      await disableFunctions();
    } else if (lowerCaseMessage == "resetar") {
      await this.controllerUser
        .deleteUser(this.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.photoOfProofOfPayment = false;
      await disableFunctions();
    } else {
      if (this.secondConfirmationMessage)
        await this.message.reply(
          this.dailyController.handleSecondConfirmationMessage(
            this.twoHours,
            this.resultMessage,
            this.getTotalCost
          )
        );
    }
  }

  async #handleRoomSelection() {
    const messageNumberRoom = this.message.body;
    const numbers = messageNumberRoom.match(/\d+/g);
    const resultLogicForAddingUserToRoom = new LogicForAddingUserToRoom(
      numbers
    ).inicialize();

    if (resultLogicForAddingUserToRoom) {
      this.twoHours = resultLogicForAddingUserToRoom.chosenRooms.twoHours;
      this.resultMessage =
        resultLogicForAddingUserToRoom.chosenRooms.resultMessage;
      this.getTotalCost = resultLogicForAddingUserToRoom.getTotalCost;

      await this.message.reply(
        this.dailyController.handleRoomConfirmationMessage(
          this.twoHours,
          this.resultMessage,
          this.getTotalCost
        )
      );
      this.errorMessage = false;
      this.startConversation = false;
      this.secondConfirmationMessage = true;
    } else {
      await this.message.reply(
        this.dailyController.dailyUseCase.errorMessageWhenChoosingRoom()
      );
      return (this.errorMessage = true);
    }

    return (this.receivedTheRoom = true);
  }

  async #handleInvalidInput() {
    await this.message.reply("Entrada inválida. Por favor, tente novamente.");
  }
  async #handleProofOfPayment() {
    try {
      if (this.message.hasMedia) {
        const media = await this.message.downloadMedia();
        console.log(media.data);
        const fileName = `payment_${Date.now()}.jpeg`;
        const filePath = `./downloads/${fileName}`;
        fs.writeFileSync(filePath, media.data);
        console.log(`Imagem salva em: ${filePath}`);

        const result = await Tesseract.recognize(filePath, "por", {
          logger: (info) => {
            console.log(info);
          },
        });

        const recognizedText = result.data.text;
        console.log("Texto reconhecido:", recognizedText);
      }
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
    }
  }
}

module.exports = WhatsAppDriver;
