class LogicForAddingUserToRoom {
  constructor(userChoices) {
    this.timeSlots = {
      1: "19:00",
      2: "20:00",
      3: "21:00",
      4: "22:00",
      5: "23:00",
      6: "00:00",
      7: "01:00",
    };

    this.selectedTimeSlots = [];
    this.userChoices = userChoices;
  }

  inicialize() {
    if (!this.userChoices) {
      return false;
    } else {
      const selectedSlots = this.#selectedSlots();
      const getTotalCost = this.#getTotalCost();
      const chosenTimes = this.#chosenTimes();
      const chosenRooms = this.#chosenRooms();
      return { selectedSlots, getTotalCost, chosenTimes, chosenRooms };
    }
  }

  #selectedSlots() {
    this.userChoices.forEach((choice) => {
      const timeSlot = this.timeSlots[choice];
      if (timeSlot) {
        const slots = timeSlot.split("-")[1]?.trim().split(" ")[0];
        if (slots) {
          return this.selectedTimeSlots.push(parseInt(slots));
        }
      }
      return null;
    });
  }

  #getTotalCost() {
    const totalCost = this.userChoices.length * 1.5;
    return totalCost.toFixed(2);
  }

  #chosenRooms() {
    let resultMessage = "";
    let twoRooms = false;
    for (let i = 0; i < this.selectedTimeSlots.length; i++) {
      resultMessage += `${this.selectedTimeSlots[i]}  `;
    }

    if (twoRooms > 1) {
      twoH = true;
    }
    return { resultMessage, twoRooms };
  }

  #chosenTimes() {
    for (let i = 1; i <= Object.keys(this.timeSlots).length; i++) {
      for (let j = 0; j < this.userChoices.length; j++) {
        if (this.timeSlots[i] === this.timeSlots[Number(this.userChoices[j])]) {
          this.selectedTimeSlots.push(this.timeSlots[i]);
        }
      }
    }
  }
}

module.exports = LogicForAddingUserToRoom;
