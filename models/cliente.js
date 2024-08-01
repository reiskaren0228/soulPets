// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade que definimos vira uma coluna da tabela

import { connection } from "../config/database.js"
import { DataTypes } from "sequelize";
import { Endereco } from "./endereco.js";
import { Pet } from "./pet.js";

export const Cliente = connection.define("cliente", {
    // Configurando a coluna "nome"
    nome: {
        type: DataTypes.STRING(130), // Define a coluna "nome" como VARCHAR
        allowNull: false, // Torna a coluna not null

    },
    email: { // email VARCHAR(255) UNIQUE NOT NULL
        type: DataTypes.STRING, // por padrão 255
        allowNull: false,
        unique: true, // Define os dados da coluna como UNIQUE
    },
    telefone: { // telefone VARCHAR(255) UNIQUE NOT NULL
        type: DataTypes.STRING, // por padrão 255
        allowNull: false,
        unique: true, // Define os dados da coluna como UNIQUE
    },

});

// Associacçao 1:1 (Cliente-Endereço)
// Cliente tem um Endereço
// Endereço ganha uma chave estrageira

Cliente.hasOne(Endereco, {onDelete: "Cascade"});
Endereco.belongsTo(Cliente); // Gera uma chave estrageira na tabela endereços

// Associacçao 1:1 (Cliente-Endereço)
Cliente.hasMany(Pet, {onDelete: "Cascade"});
Pet.belongsTo(Cliente); //Gera uma chave estrangeira para indicar o responsavel pelo pet.

// Cliente = model = gerenciar a tabela de clientes

// Cliente.findAll() -> Listar todos os clientes na tabela
// Cliente.update(novosDados) -> atualizar um cliente específico
// Cliente.destroy() -> apagar o cliente da tabela
// Cliente.findOne
