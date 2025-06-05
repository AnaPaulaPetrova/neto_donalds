const database = require("./database");
const FoodRepository = require("./repository");

const repository = new FoodRepository(database);

async function getAllFoods(request, reply) {
  const responseDB = await repository.getAllFoods();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}
async function getFoodById(request, reply) {
  const id = request.params.id;
  const responseDB = await repository.getFoodById(id);
  const responsefillings = await repository.getFillingsById(id);
  if (responseDB.error) return reply.status(404).json(responseDB.error);

  const response = {
    food: responseDB,
    fillings: responsefillings
  }

  reply.json(response);
}
async function setPayment(request, reply){
  const payInfo = request.body;

  const responseDB = await repository.setPayment(payInfo);

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}
async function getHistorico(request, reply){
  const responseDB = await repository.getAllpayments();

  if (responseDB.error) return reply.status(404).json(responseDB.error);

  reply.json(responseDB);
}

module.exports = { getAllFoods, getFoodById, setPayment, getHistorico };
