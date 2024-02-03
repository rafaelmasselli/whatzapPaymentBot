const db = require("../db/db");

class rooms {
  constructor(
    id,
    user_id = null,
    available_vacancies,
    participants = null,
    isChampionshipTime = false,
    championshipTime
  ) {
    this.id = id;
    this.user_id = user_id;
    this.available_vacancies = available_vacancies;
    this.participants = participants;
    this.isChampionshipTime = isChampionshipTime;
    this.championshipTime = championshipTime;
  }

  async addUserRoom() {
    const query = `
      INSERT INTO schedules (user_id, available_vacancies, participants, isChampionshipTime, championshipTime)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
      this.user_id,
      this.available_vacancies,
      this.participants,
      this.isChampionshipTime,
      this.championshipTime,
    ];

    try {
      const result = await db.run(query, params);
      return result.id;
    } catch (error) {
      throw error;
    }
  }
  async numberOfRoomsAvailable() {
    const query = `
        SELECT id, available_vacancies, championshipTime
        FROM schedules
    `;

    try {
      const result = await db.all(query);
      return result;
    } catch (error) {
      console.error("error when searching for salts ", error);
    }
  }
}

module.exports = rooms;
