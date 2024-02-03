const express = require("express");
const { userController, roomsController } = require("../controller/index");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bem-vindo ao meu projeto Node.js com SQLite!");
});

router.get("/rooms", async (req, res) => {
  try {
    const result =
      await new roomsController().searchForANumberOfAvailableRooms();
    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar quartos:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

module.exports = router;
