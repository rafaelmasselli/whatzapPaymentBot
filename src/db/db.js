const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor() {
    this.db = new sqlite3.Database("../../db.sqlite", (err) => {
      if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
      } else {
        console.log("Conectado ao banco de dados SQLite.");
        this.initializeDatabase();
      }
    });
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error("Erro ao fechar o banco de dados:", err.message);
      } else {
        console.log("Banco de dados fechado.");
      }
    });
  }

  run(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          console.error("Erro ao executar a query:", err.message);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          console.error("Erro ao executar a query:", err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  initializeDatabase() {
    const dropTableUsersScript = `DROP TABLE IF EXISTS users;`;
    const dropTableRoomsScript = `DROP TABLE IF EXISTS schedules;`;

    const createTableUserScript = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL UNIQUE CHECK(length(phoneNumber) >= 10 AND length(phoneNumber) <= 15),
        squadName TEXT,
        schedule JSON,
        paymentInfo JSON,
        isPaid BOOLEAN DEFAULT 0
      );
    `;
    const createTableLivingRoomScript = `
    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      available_vacancies INTEGER DEFAULT 12,
      participants JSON DEFAULT '[]',
      isChampionshipTime BOOLEAN DEFAULT 0,
      championshipTime TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;
    const insertLivingRoomDataScript = `
  INSERT INTO schedules (id, available_vacancies, isChampionshipTime, championshipTime)
  VALUES
    (1, 12, 0, '19'),
    (2, 12, 0, '20'),
    (3, 12, 0, '21'),
    (4, 12, 0, '22'),
    (5, 12, 0, '23'),
    (6, 12, 0, '00'),
    (7, 12, 0, '01');
`;

    this.run(dropTableUsersScript)
      .then(() => {
        console.log("Tabela 'users' excluída com sucesso (se existir).");
        return this.run(createTableUserScript);
      })
      .then(() => {
        console.log("Tabela 'users' criada com sucesso.");
      })
      .catch((err) => {
        console.error("Erro ao inicializar o banco de dados:", err.message);
      });

    this.run(dropTableRoomsScript)
      .then(() => {
        console.log("Tabela 'rooms' excluída com sucesso (se existir).");
        return this.run(createTableLivingRoomScript);
      })
      .then(() => {
        console.log("Tabela 'rooms' criada com sucesso.");
        return this.run(insertLivingRoomDataScript);
      })
      .then(() => {
        console.log("Dados iniciais da tabela 'rooms' inseridos com sucesso.");
      })
      .catch((err) => {
        console.error("Erro ao inicializar o banco de dados:", err.message);
      });
  }
}

module.exports = new Database();
