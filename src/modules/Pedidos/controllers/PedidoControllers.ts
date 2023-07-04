import { Request, Response, Router } from 'express';
import IPedido from '../interfaces/IPedido';
import PedidoRepository from '../repository/PedidoRepository';
import Authenticate from '../../../middleware/Authenticate';

const pedidoRouter = Router();

pedidoRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { pagina = 1, limite = 10 } = req.query;

    const pedido = await PedidoRepository.getPedidos(Number(pagina), Number(limite));

    return res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

pedidoRouter.get('/:id',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const pedido = await PedidoRepository.getPedidoById(id);
  if (pedido) {
    return res.status(200).json(pedido);
  } else {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
});

pedidoRouter.post('/',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const { usuarioId, produtoId, quantidade } = req.body;
  const pedido: IPedido = {
    usuarioId,
    produtoId,
    quantidade,
  };

  const pedidoNovo = await PedidoRepository.postPedido(pedido);
  return res.status(201).json(pedidoNovo);
});

pedidoRouter.put('/:id',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { usuarioId, produtoId, quantidade } = req.body;
  const pedido: IPedido = {
    usuarioId,
    produtoId,
    quantidade,
  };

  const pedidoAtualizado = await PedidoRepository.updatePedido(id, pedido);
  if (pedidoAtualizado) {
    return res.status(200).json(pedidoAtualizado);
  } else {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
});

pedidoRouter.delete('/:id',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const pedidoDeletado = await PedidoRepository.deletarPedido(id);

  if (pedidoDeletado) {
    return res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } else {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

});
export default pedidoRouter;