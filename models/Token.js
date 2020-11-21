const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  _userId: {
    type: mongoose.Types.ObjectId, //Guardo referencia al schema de usuario
    required: true,
    ref: "Usuario", //Lo vamos a referir como Usuario, por que en mongo se guarda solo el ID del usuario
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
    //Este documento dentro de la base se elimina en el momento que este tiempo expira, se autoelimina
  },
});

module.exports = mongoose.model("Token", TokenSchema);
