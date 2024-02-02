const user = require("../model/userModel");

class userController {
  constructor() {
    this.User = new user();
  }

  async getUserPhoneNumber(phoneNumber) {
    this.User.phoneNumber = phoneNumber;
    const UserFindByPhoneNumber = await this.User.getFindByPhoneNumber();
    return UserFindByPhoneNumber;
  }

  async createStartupUser(name, phoneNumber) {
    this.User.name = name;
    this.User.phoneNumber = phoneNumber;
    const userId = await this.User.createStartupUser();
    return { message: `Usuário criado com sucesso! ID: ${userId}` };
  }
  async deleteUser(id) {
    this.User.id = id;
    console.log(id);
    try {
      const result = await this.User.deleteUserByCellPhoneNumber();
      if (result) {
        return { message: `Usuário excluído com sucesso!` };
      } else {
        return { message: `Usuário não encontrado.` };
      }
    } catch (err) {
      return { message: `Erro ao excluir usuário. ${err}` };
    }
  }
}
module.exports = userController;
