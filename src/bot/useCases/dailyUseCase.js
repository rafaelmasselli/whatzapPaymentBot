require("dotenv").config();

class DailyUseCase {
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
}

module.exports = DailyUseCase;
