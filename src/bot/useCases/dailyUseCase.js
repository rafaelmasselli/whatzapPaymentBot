const Daily = require("../entities/daily.js");

class DailyUseCase {
  constructor() {}

  getDailyMessage() {
    return `Olá! 😊 Reserve agora o seu horário no Diário Sucox! 
Envie "Quero reservar o horário das [insira os horários desejados, por exemplo, 1 para 19:00, 2 para 20:00]." 
Substitua pelos números correspondentes aos horários que preferir. Pode ser a qualquer hora!

⏱️ Horários Disponíveis ⏱️
1️⃣ 19:00 - 12 vagas
2️⃣ 20:00 - 12 vagas
3️⃣ 21:00 - 12 vagas
4️⃣ 22:00 - 12 vagas
5️⃣ 23:00 - 12 vagas
6️⃣ 00:00 - 12 vagas
7️⃣ 01:00 - 12 vagas
    
Envie o número correspondente para garantir seu lugar! 🕹️✨
    `;
  }

  getConfirmationRoom(resultLogicForAddingUserToRoom) {
    return `Voce escolheu ${
      resultLogicForAddingUserToRoom.chosenRooms.twoHours
        ? "a sala das "
        : "as salas da "
    }${
      resultLogicForAddingUserToRoom.chosenRooms.resultMessage
    }o valor vai ser de R$${
      resultLogicForAddingUserToRoom.getTotalCost
    }, deseja prosseguir?
(por favor digite sim ou nao)
    `;
  }

  errorMessageWhenChoosingRoom() {
    return `Por favor preste atenção na tabela abaixo.
    
${this.getDailyMessage()}
    `;
  }
}

module.exports = DailyUseCase;
