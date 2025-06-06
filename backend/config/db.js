const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.embmxdg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(" Conectou ao banco!");

    return dbConn;
  } catch (error) {
    console.log(" Erro ao conectar ao banco:", error);
  }
};

conn();

module.exports = conn;
