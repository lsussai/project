import { Request, Response, Router } from 'express';
import IPedido from '../interfaces/IPedido';
import PedidoRepository from '../repository/PedidoRepository';

const pedidoRouter = Router();

pedidoRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const pedidos = await PedidoRepository.getPedidos();
  return res.status(200).json(pedidos);
});

pedidoRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const pedido = await PedidoRepository.getPedidoById(id);
  if (pedido) {
    return res.status(200).json(pedido);
  } else {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
});

pedidoRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { usuarioId, produtoId, quantidade } = req.body;
  const pedido: IPedido = {
    usuarioId,
    produtoId,
    quantidade,
  };

  const pedidoNovo = await PedidoRepository.postPedido(pedido);
  return res.status(201).json(pedidoNovo);
});

pedidoRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
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

pedidoRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const pedidoDeletado = await PedidoRepository.deletarPedido(id);

  if (pedidoDeletado) {
    return res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } else {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

});
export default pedidoRouter;