import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Pet = connection.define("pet", {
  // Configurando a coluna "nome"
  nome: {
    type: DataTypes.STRING(90), // Define a coluna "nome" como VARCHAR (90)
    allowNull: false, // Torna a coluna not null
  },
  tipo: {
    type: DataTypes.STRING(100), // Define a coluna "tipo" como VARCHAR (100)
    allowNull: false, // Torna a coluna not null
  },
  porte: {
    type: DataTypes.STRING(100), // Define a coluna "porte" como VARCHAR (100)
    allowNull: false, // Torna a coluna not null
  },
  dataNasc: {
    type: DataTypes.DATEONLY, // Define a coluna "dataNasc" como DATEONLY
  },
});
