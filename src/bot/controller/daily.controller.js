const dailyUseCases = require("../useCases/dailyUseCase");

class dailyController {
  constructor() {
    this.dailyUseCase = new dailyUseCases();
  }

  handleDailyMessage() {
    return this.dailyUseCase.getDailyMessage();
  }

  handleRoomConfirmationMessage(twoHours, resultMessage, getTotalCost) {
    return this.dailyUseCase.getConfirmationRoom(
      twoHours,
      resultMessage,
      getTotalCost
    );
  }

  handleErrorWhenSendingRoomTimeMessage() {
    return this.dailyUseCase.errorMessageWhenChoosingRoom();
  }
  handlePixKeyAfterConfirmation() {
    return this.dailyUseCase.pixKeyAfterConfirmation();
  }

  handleSecondConfirmationMessage(twoHours, resultMessage, getTotalCost) {
    return this.dailyUseCase.secondConfirmationMessage(
      twoHours,
      resultMessage,
      getTotalCost
    );
  }
}

module.exports = dailyController;
