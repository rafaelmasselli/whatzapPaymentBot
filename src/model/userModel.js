const db = require("../db/db");

class User {
  constructor(
    name,
    phoneNumber,
    squadName = null,
    schedule = null,
    paymentInfo = null,
    isPaid = false
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.squadName = squadName;
    this.schedule = schedule;
    this.paymentInfo = paymentInfo;
    this.isPaid = isPaid;
  }

  async createStartupUser() {
    const query =
      "INSERT INTO users (name, phoneNumber, isPaid) VALUES (?, ?, ?)";
    const params = [this.name, this.phoneNumber, (this.isPaid = 0)];

    try {
      const result = await db.run(query, params);
      console.log(`User ${this.name} added with ID: ${result.id}`);
      return result.id;
    } catch (error) {
      throw error;
    }
  }

  async getFindByPhoneNumber() {
    const query = "SELECT * FROM users WHERE phoneNumber = ?";
    try {
      const user = await db.all(query, [this.phoneNumber]);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    const query = "SELECT * FROM users";
    try {
      const users = await db.all(query);
      return users;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
