const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Subdocumento para os sabores de cada pizza, com observações
const SaborSchema = new mongoose.Schema({
    sabor: { type: String, required: true },
    observacao: { type: String }
});

const PizzaSchema = new mongoose.Schema({
    sabores: [SaborSchema]
});

// Schema do pedido
const PedidoSchema = new mongoose.Schema({
    pedidoId: { type: Number }, // Campo auto incrementado para o ID do pedido
    cliente: { type: String, required: true }, // Nome do cliente
    endereco: { type: String, required: true }, // Endereço do cliente
    telefone: { type: String, required: true }, // Telefone do cliente
    pizzas: [PizzaSchema],
    data: { type: Date, default: Date.now },
    status: { type: Number, required: true, default: 1 } // Status do pedido como ID numérico
});

// Aplicando o auto incremento ao campo pedidoId
PedidoSchema.plugin(AutoIncrement, { inc_field: 'pedidoId' });

const Pedido = mongoose.model('Pedido', PedidoSchema);

module.exports = Pedido;
