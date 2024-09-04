const mongoose = require('mongoose');

const SaborSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    tipo_sabor: { type: Number, required: true }
});

const Sabor = mongoose.model('Sabor', SaborSchema, 'sabores');

module.exports = Sabor;
