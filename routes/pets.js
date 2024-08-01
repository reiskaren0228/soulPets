import { Pet } from "../models/pet.js";
import { Cliente } from "../models/cliente.js";
import { Router } from "express";

export const petsRouter = Router();


// Novos endpoints para os pets

// Listar todos os pets
petsRouter.get("/pets", async (req, res) => {
    try {
      const listaPets = await Pet.findAll();
      res.json(listaPets);
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao listar os pets." });
    }
  });
  
  // Listando um pet específico
  petsRouter.get("/pets/:id", async (req, res) => {
    try {
      const pet = await Pet.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          { model: Cliente, attributes: ["id", ["nome", "nomeCliente"]] },
        ],
      });
  
      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ message: "Pet não encontrado!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao buscar o pet." });
    }
  });
  
  // Deletando um pet específico
  petsRouter.delete("/pets/:id", async (req, res) => {
    try {
      const pet = await Pet.findOne({ where: { id: req.params.id } });
  
      if (pet) {
        await pet.destroy();
        res.json({ message: "Pet removido com sucesso!" });
      } else {
        res.status(404).json({ message: "Pet não encontrado!" });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao excluir o pet." });
    }
  });
  
  // POST / pets => Inserir um novo pet
  petsRouter.post("/pets", async (req, res) => {
    const { nome, tipo, porte, dataNasc, clienteId } = req.body;
  
    try {
      const cliente = await Cliente.findByPk(clienteId);
  
      if (cliente) {
        //Inserir o pet
        await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
        res.json({ message: "Pet criado com sucesso." });
      } else {
        res.status(404).json({
          message: "Falha ao inserir o pet. Cliente não foi encontrado.",
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao adicionar o pet." });
    }
  });
  
  // PUT / pets/:id => Atualizar um pet
  petsRouter.put("/pets/:id", async (req, res) => {
    const { nome, tipo, porte, dataNasc } = req.body;
  
    try {
      const pet = await Pet.findByPk(req.params.id);
  
      if (pet) {
        //Atualiza o pet
        await pet.update({ nome, tipo, porte, dataNasc });
        res.json({ message: "Pet atualizado com sucesso!" });
      } else {
        res.status(404).json({
          message: "O Pet não foi encontrado.",
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao atualizar o pet." });
    }
  });