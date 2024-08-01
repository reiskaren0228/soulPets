import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

// Colunas: uf, cidade, cep, rua, numero

export const Endereco = connection.define("endereco", {
  // Configurando a coluna "endereco"
  uf: {
    // uf VARCHAR(2) NOT NULL
    type: DataTypes.STRING(2), // Define a coluna "uf" como VARCHAR(2)
    allowNull: false, // Torna a coluna not null
  },
  cidade: {
    // cidade VARCHAR(100) NOT NULL
    type: DataTypes.STRING, // Define a coluna "cidade" como VARCHAR (255)
    allowNull: false, // Torna a coluna not null
  },
  cep: {
    // cep VARCHAR(9) NOT NULL
    type: DataTypes.STRING(8), // Define a coluna "cep" como VARCHAR(8)
    allowNull: false, // Torna a coluna not null
  },
  rua: {
    // rua VARCHAR(255) NOT NULL
    type: DataTypes.STRING, // por padrão 255
    allowNull: false, // Torna a coluna not null
  },
  numero: {
    // numero VARCHAR(10) NOT NULL
    type: DataTypes.STRING, // Define a coluna "numero" como VARCHAR
    defaultValue: "S/N", // Torna o valor da coluna padrão
  },
});
