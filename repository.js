class FoodRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllFoods() {
    try {
      const sql = "select * from foods";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFoodById (id) {
    try{
      const sql = "select name, preco from foods where id = $1";
      const responseDB = await this.database.query(sql, [id]);
      return responseDB.rows;

    }catch(error){
      return{error: error.message};
    }
  }
  async getFillingsById(id) {
    try {
        const sql = "select nome, price from fillings where id_foods = $1";
        const responseDB = await this.database.query(sql, [id]);

        return responseDB.rows
    } catch (error) {
        return {error: error.message}
    }
  }

  async setPayment(payInfo) {
    try{
      const sql = `insert into payment (id_foods, cpf, pay_date, description, price)
                   values ($1, $2, $3, $4, $5)`;
      const response = await this.database.query(sql, [payInfo.id_foods, payInfo.cpf, payInfo.pay_date, payInfo.description, payInfo.price]);
      return "Pagamento realizado!";
    }catch(erro){
      return{error: error.message}
    }
  }
  async getAllpayments() {
    try {
      const sql = "select * from payment";
      const responseDB = await this.database.query(sql);

      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }
}


module.exports = FoodRepository;
