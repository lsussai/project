import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import Pedido from "../entities/Pedidos";
import IPedido from "../interfaces/IPedido";

const pedidoRepository = AppDataSource.getRepository(Pedido);

const getPedidos = (offset: number, limit: number): Promise<Pedido[]> => {
  return pedidoRepository.find({
    skip: offset,
    take: limit,
  });
};

const getPedidoById = (id: number): Promise<Pedido | null> => {
  const options: FindOneOptions<Pedido> = {
    where: { id: id },
   
  };

  return pedidoRepository.findOne(options);
};

const postPedido = (pedido: IPedido): Promise<IPedido> => {
  return pedidoRepository.save(pedido);
};

const updatePedido = async (id: number, pedido: IPedido): Promise<Pedido | null> => {
  const options: FindOneOptions<Pedido> = {
    where: { id: id },
  };
  const pedidoExistente = await pedidoRepository.findOne(options);

  if (pedidoExistente) {
    Object.assign(pedidoExistente, pedido);
    return pedidoRepository.save(pedidoExistente);
  }

  return null;
};

const deletarPedido = async (id: number): Promise<Pedido | null> => {
  const options: FindOneOptions<Pedido> = {
    where: { id: id },
    relations: ["usuario", "produto"],
  };
  const pedido = await pedidoRepository.findOne(options);

  if (pedido) {
    await pedidoRepository.remove(pedido);
    return pedido;
  }

  return null;
};

export default { getPedidos, getPedidoById, postPedido, deletarPedido, updatePedido };