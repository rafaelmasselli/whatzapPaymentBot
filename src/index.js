const express = require("express");
const routes = require("./routes/index.routes");
require("./bot/");

const app = express();
const port = 3000;

app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
