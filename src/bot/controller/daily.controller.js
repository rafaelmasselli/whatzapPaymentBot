const dailyUseCases = require("../useCases/dailyUseCase");

class dailyController {
  constructor() {
    this.dailyUseCase = new dailyUseCases();
  }

  handleDailyMessage() {
    return this.dailyUseCase.getDailyMessage();
  }

  handleRoomConfirmationMessage(resultLogicForAddingUserToRoom) {
    return this.dailyUseCase.getConfirmationRoom(
      resultLogicForAddingUserToRoom
    );
  }

  handleErrorWhenSendingRoomTimeMessage() {
    return this.dailyUseCase.errorMessageWhenChoosingRoom();
  }
}

module.exports = dailyController;
