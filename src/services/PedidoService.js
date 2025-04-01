// services/PedidoService.js
//const escpos = require('escpos');
//const printer = new escpos.Printer(); // Supondo que você tenha configurado a impressora
const Pedido = require('../models/PedidoModel');

/**
 * Função para imprimir um pedido
 * @param {Object} pedido - O pedido a ser impresso
 
async function imprimirPedido(pedido) {
  // Conecte à impressora (ajuste conforme sua configuração)
  const device = new escpos.Network('IP_DA_IMPRESSORA');
  const printer = new escpos.Printer(device);

  device.open(async () => {
    printer
      .text(`ID do Pedido: ${pedido.pedidoId}`)
      .text(`Nome do Cliente: ${pedido.cliente}`)
      .text(`Endereço: ${pedido.endereco}`)
      .text(`Telefone: ${pedido.telefone}`)
      .text(`Data do Pedido: ${new Date(pedido.data).toLocaleDateString()} ${new Date(pedido.data).toLocaleTimeString()}`)
      .text(`Status: ${pedido.status}`)
      .text('Pizzas:')
      .text('')

    pedido.pizzas.forEach((pizza, index) => {
      printer
        .text(`Pizza ${index + 1}`)
        .text('Sabores:')
      pizza.sabores.forEach((sabor) => {
        printer
          .text(`- ${sabor.sabor}${sabor.observacao ? ' (Observação: ' + sabor.observacao + ')' : ''}`)
      });
      printer.text('');
    });

    printer.cut().close();
  });
}
*/
const  imprimirPedido = async (pedidoId) => {
  try {
      const pedido = await Pedido.findById(pedidoId);
      if (!pedido) {
          return res.status(404).send('Pedido não encontrado.');
      }

      res.render('imprimirPopup', { pedidoId: pedido._id }); // Renderiza a página de impressão

  } catch (error) {
      console.error('Erro ao buscar pedido para impressão:', error);
      res.status(500).send('Erro no servidor.');
  }
};



module.exports = { imprimirPedido };
