require("dotenv").config();

class DailyUseCase {
  constructor() {
    this.rooms = null;
  }

  getDailyMessage() {
    return `Olá! 😊 Reserve agora o seu horário no Diário Sucox! 
Envie "Quero reservar o horário das [insira os horários desejados, por exemplo, 1 para 19:00, 2 para 20:00]." 
Substitua pelos números correspondentes aos horários que preferir. Pode ser a qualquer hora!
          
⏱️ Horários Disponíveis ⏱️
1️⃣ ${this.rooms[0].championshipTime}:00 - ${this.rooms[0].available_vacancies} vagas
2️⃣ ${this.rooms[1].championshipTime}:00 - ${this.rooms[1].available_vacancies} vagas
3️⃣ ${this.rooms[2].championshipTime}:00 - ${this.rooms[2].available_vacancies} vagas
4️⃣ ${this.rooms[3].championshipTime}:00 - ${this.rooms[3].available_vacancies} vagas
5️⃣ ${this.rooms[4].championshipTime}:00 - ${this.rooms[4].available_vacancies} vagas
6️⃣ ${this.rooms[5].championshipTime}:00 - ${this.rooms[5].available_vacancies} vagas
7️⃣ ${this.rooms[6].championshipTime}:00 - ${this.rooms[6].available_vacancies} vagas
              
Envie o número correspondente para garantir seu lugar! 🕹️✨`;
  }

  getConfirmationRoom(twoHours, resultMessage, getTotalCost) {
    return `Voce escolheu ${
      twoHours ? "a sala das " : "as salas da "
    }${resultMessage}o valor vai ser de R$${getTotalCost}, deseja prosseguir?
(por favor digite "sim" ou "nao", caso os horário(s) esteja errado digite "resetar")`;
  }

  errorMessageWhenChoosingRoom() {
    return `Por favor preste atenção na tabela abaixo.
${this.getDailyMessage()}`;
  }

  pixKeyAfterConfirmation() {
    return `Faca o pagamento via pix para esse numero: ${process.env.PIX_KEY}, apos o pagamento mande o comprovante para confirmação da sala`;
  }

  secondConfirmationMessage(twoHours, resultMessage, getTotalCost) {
    return `${this.getConfirmationRoom(twoHours, resultMessage, getTotalCost)}  
`;
  }
  messageReset() {
    return `O histórico de conversa foi reiniciado, para inciar um novo pedido digite "oi"`;
  }
}

module.exports = DailyUseCase;
