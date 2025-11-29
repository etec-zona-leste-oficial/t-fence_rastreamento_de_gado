const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const collarRoutes = require("./src/routes/collarRoutes");
const PropertyRoutes = require("./src/routes/PropertyRoutes");
const Fence = require("./src/routes/FenceRoutes");
const Animal = require("./src/routes/animalRoutes");
const Central = require("./src/routes/centralRoutes");
const Alert = require("./src/routes/alertRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/collar", collarRoutes);
app.use("/property", PropertyRoutes);
app.use("/fence", Fence);
app.use("/animal", Animal);
app.use("/central", Central);
app.use("/alert", Alert);


const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB primeiro
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error("Erro ao iniciar o servidor:", err);
});
