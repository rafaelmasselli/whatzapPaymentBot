const User = require("../model/userModel");

class userController {
  constructor() {
    this.user = new User();
  }

  async getUserPhoneNumber(phoneNumber) {
    this.user.phoneNumber = phoneNumber;
    const UserFindByPhoneNumber = await this.user.getFindByPhoneNumber();
    return UserFindByPhoneNumber;
  }

  async createStartupUser(name, phoneNumber) {
    this.user.name = name;
    this.user.phoneNumber = phoneNumber;
    const user = await this.user.createStartupUser();
    return { message: `Usuário criado com sucesso! ${user}` };
  }
  async deleteUser(id) {
    this.user.id = id;
    try {
      const result = await this.user.deleteUserByCellPhoneNumber();
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
