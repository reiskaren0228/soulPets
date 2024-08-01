import { connection, authenticate } from "./config/database.js";
import express from "express";
import { clientesRouter } from "./routes/clientes.js";
import { petsRouter } from "./routes/pets.js";


authenticate(connection).then(() => {
  // Após conectar no banco de dados, ele irá sicronizar os models
  // no banco, ou seja, irá gerar as tabelas caso necessario
  // force: true -> irá dropar tudo e criar do zero navamente
  // recomendado apenas durante o desenvolvimento

  //connection.sync({force: true});

  connection.sync();
});

// Definir a aplicação back-end em Express
// Recursos pré-configurados
const app = express();

//Garantir que todas as requisições que tem body sejam lidas com JSON
app.use(express.json());

// Definir os endpoints do backend
app.use(clientesRouter);
app.use(petsRouter);


// Rodar a aplicação do backend
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
