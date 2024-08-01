import { Cliente } from "../models/cliente.js";
import { Endereco } from "../models/endereco.js";
import { Router } from "express";

// Criar o módulo de rotas
export const clientesRouter = Router();

// Definir os endepoints do back-end
// Métodos: GET(leitura), POST(inserção), PUT(alteração), DELETE(remoção)
//app.get("/hello", (req, res) => {
// manipulador de rota
//res.send("Olá usuário!"); // enviando a resposta para quem solicitou
//});

// Listagem de todos os clientes
clientesRouter.get("/clientes", async (req, res) => {
  // SELECT * FROM clientes;
  const listaClientes = await Cliente.findAll();
  res.json(listaClientes);
});

// Listagem de um cliente especifico (ID = ?)
// :id => parâmetro de rota
clientesRouter.get("/clientes/:id", async (req, res) => {
  // SELECT * FROM clientes WHERE id = 1;
  //console.log(req.params.id);
  //res.send("Cliente: " + req.params.id);

  const cliente = await Cliente.findOne({
    where: { id: req.params.id },
    include: [Endereco], // juntar os dados do cliente com seu respectivo endereço
  });

  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ message: "Cliente não encontrado!" });
  }
});

clientesRouter.post("/clientes", async (req, res) => {
  // Extraimos os dados do body que serão usados na inserção
  const { nome, email, telefone, endereco } = req.body;

  try {
    // Tentativa de inserir o cliente
    await Cliente.create(
      { nome, email, telefone, endereco },
      { include: [Endereco] } // Indicamos que o endereço será salco e associado ao cliente
    );
    res.json({ message: "Cliente criado com sucesso!" });
  } catch (err) {
    // Tratamento caso ocorra algum erro
    // 500 -> Internal Error
    console.log(err);
    res.status(500).json({ message: "Um erro ocorreu ao inserir um cliente." });
  }

  // console.log(req.body); // dados do corpo da requisição
  // res.send("Resposta");
});

clientesRouter.put("/clientes/:id", async (req, res) => {
  // Checa se o cliente existe
  // console.log(req.params);
  // console.log(req.body);
  // res.send("Update")
  const idCliente = req.params.id;
  const { nome, email, telefone, endereco } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { id: idCliente } });

    if (cliente) {
      // Segue com a atualização
      // Atauliza a linha do endereco que for o id do cliente
      // for igual ao id do cliente sendo atualizado.
      await Endereco.update(endereco, { where: { clienteId: idCliente } });
      await cliente.update({ nome, email, telefone });
      res.json({ message: "Cliente atualizado." });
    } else {
      res.status(404).json({ message: "O cliente não foi encontrado!" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro ao atualizar o cliente." });
  }
});

clientesRouter.delete("/cliente/:id", async (req, res) => {
  const idCliente = req.params.id;

  try {
    const cliente = await Cliente.findOne({ where: { id: idCliente } });

    if (cliente) {
      //exclui o cliente
      await cliente.destroy();
      res.json({ message: "Cliente removido com sucesso!" });
    } else {
      res.status(404).json({ message: "Cliente não encontrado." });
    }
  } catch (err) {
    res.status(500).json({ message: "Um erro ocorreu ao excluir o cliente." });
  }
});
