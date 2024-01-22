const user = require("../model/userModel");

class userController {
  async getUserPhoneNumber(phoneNumber) {
    const User = new user();
    User.phoneNumber = phoneNumber;
    const UserFindByPhoneNumber = await User.getFindByPhoneNumber();
    return UserFindByPhoneNumber;
  }

  async createStartupUser(name, phoneNumber) {
    const User = new user(name, phoneNumber, false);
    const userId = await User.createStartupUser();
    return { message: `Usuário criado com sucesso! ID: ${userId}` };
  }
}
module.exports = userController;
