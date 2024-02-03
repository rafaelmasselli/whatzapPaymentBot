const Rooms = require("../model/roomModel");

class roomController {
  constructor() {
    this.rooms = new Rooms();
  }
  async searchForANumberOfAvailableRooms() {
    return await this.rooms.numberOfRoomsAvailable();
  }
}

module.exports = roomController;
