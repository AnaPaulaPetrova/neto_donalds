const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json())

server.get("/foods", Controller.getAllFoods);
server.get("/food/:id", Controller.getFoodById);
server.post("/payment", Controller.setPayment);
server.get("/historico", Controller.getHistorico);

//TODO: Implementar uma nova rota de histórico de pagamentos do cliente server.get("/historyc", Controller.getHistorycByCPF);

server.listen(PORT, () => console.log("Server ON"));
