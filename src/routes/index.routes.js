const express = require("express");
const userController = require("../controller/user.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bem-vindo ao meu projeto Node.js com SQLite!");
});

// router.post("/users", userController.createUser)

module.exports = router;
