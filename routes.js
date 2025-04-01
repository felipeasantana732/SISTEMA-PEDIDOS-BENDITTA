const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const pedidoController = require('./src/controllers/pedidoController');

// Rotas da home
route.get('/', homeController.index);

//cadastro de pedido
route.get('/pedido/cadastro', pedidoController.cadastro);
route.post('/pedido/cadastro',pedidoController.cadastrarPedido);

//listagem de pedidos
route.get('/pedidos', pedidoController.listarPedidos);
route.get('/pedido/:id', pedidoController.detalharPedido);


route.get('/pedido/imprimir/:id', pedidoController.imprimirPedido);
route.get('/pedido/imprimir/view/:id', pedidoController.exibePedido);


module.exports = route;