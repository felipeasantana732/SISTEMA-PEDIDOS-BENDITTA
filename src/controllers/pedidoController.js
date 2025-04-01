const Pedido = require('../models/PedidoModel');
const Sabor = require('../models/SaborModel');
//const { imprimirPedido } = require('../services/PedidoService');


// POST
exports.cadastrarPedido = async (req, res) => {
    try {
        console.log('Dados recebidos no POST:', req.body); // Verifique se os dados estão sendo recebidos corretamente

        const { cliente, telefone, endereco, sabores } = req.body;

        // Mapeando as pizzas com seus sabores e observações
        const pizzas = sabores.map(sabor => {
            let saborFinal = sabor.saborEsquerda;
            if (sabor.saborDireita) {
                saborFinal += `, ${sabor.saborDireita}`;
            }

            return {
                sabores: [{ sabor: saborFinal, observacao: sabor.observacao || '' }]
            };
        });

        // Criando um novo pedido com os dados recebidos
        const novoPedido = new Pedido({
            cliente, // Nome do cliente
            telefone, // Telefone do cliente
            endereco, // Endereço do cliente
            pizzas, // Pizzas com sabores e observações
            status: 1 // Status inicial (por exemplo, "Pedido recebido")
        });

        // Salvando o pedido no banco de dados
        await novoPedido.save();

        // Tentando imprimir o pedido após salvar
        /*
        try {
            await imprimirPedido(novoPedido); // Certifique-se de passar o pedido correto para a função de impressão
            req.flash('success', 'Pedido criado e enviado para impressão com sucesso.');
        } catch (printError) {
            console.error('Erro ao imprimir o pedido:', printError);
            req.flash('errors', 'Pedido criado, mas ocorreu um erro ao enviar para impressão.');
        }

        // Redirecionando para a página inicial ou outra rota desejada
        res.redirect('/pedidos');*/

        try {
            await imprimirPedido(novoPedido._id);
            req.flash('success', 'Pedido criado e enviado para impressão com sucesso.');
        } catch (printError) {
            console.error('Erro ao imprimir o pedido:', printError);
            req.flash('errors', 'Pedido criado, mas ocorreu um erro ao enviar para impressão.');
        }

        res.redirect('/pedidos');

    } catch (err) {
        console.error('Erro ao salvar o pedido:', err);
        req.flash('errors', 'Erro ao salvar o pedido.');
        res.redirect('/pedido/cadastro');
    }
};

// GET
exports.cadastro = async (req, res) => {
    try {
        // Busca todos os sabores no banco de dados
        const sabores = await Sabor.find();

        // Renderiza a view 'pedidoForm' e passa os sabores como uma variável para a view
        res.render('pedidoForm', { sabores });
        //console.log({sabores});
    } catch (err) {
        console.error('Erro ao buscar sabores:', err);
        res.status(500).send('Erro ao carregar o formulário de pedido.');
    }
};


exports.listarPedidos = async (req, res) => {
    try {
        // Buscar todos os pedidos no banco de dados
        const pedidos = await Pedido.find().sort({ createdAt: -1 }); // Ordena por data de criação (mais recente primeiro)
        res.render('listaPedidos', { pedidos });
    } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        res.status(500).send('Erro ao carregar a lista de pedidos.');
    }
};

exports.detalharPedido = async (req, res) => {
    try {
        // Buscar pedido pelo ID
        const pedido = await Pedido.findById(req.params.id);
        if (!pedido) {
            return res.status(404).send('Pedido não encontrado.');
        }
        res.render('detalharPedido', { pedido });
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).send('Erro ao carregar os detalhes do pedido.');
    }
};


exports.imprimirPedido = async ( req , res ) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        //console.log(req.params.id);
        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
        }
        res.json({ success: true, pedido }); // Retorna os dados do pedido
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};


exports.exibePedido = async ( req, res ) => {
    try {
        const pedido = await Pedido.findById(req.params.id);
        //console.log(req.params.id);
        if (!pedido) {
            return res.status(404).send('Pedido não encontrado.');
        }

        res.render('imprimirPopup', { pedido }); // Renderiza a página de impressão
    } catch (error) {
        console.error('Erro ao carregar a página de impressão:', error);
        res.status(500).send('Erro no servidor.');
    }
};