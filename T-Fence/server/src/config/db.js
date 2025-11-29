require('dotenv').config();
const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

async function connectDB() {
  try {
    await mongoose.connect(
       `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=T-FenceDB`
    );
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
  }
}

module.exports = { connectDB };