import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

//configurando express
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//usando rotas
app.use(routes);

// Iniciar servidor
app.listen(process.env.PORT || 3000);