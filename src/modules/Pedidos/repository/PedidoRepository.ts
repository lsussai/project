import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import Pedido from "../entities/Pedidos";
import IPedido from "../interfaces/IPedido";

const pedidoRepository = AppDataSource.getRepository(Pedido);

const getPedidos = async (pagina: number, limite: number): Promise<Pedido[]> => {
  const offset = (pagina - 1) * limite;
  const [result, count] = await pedidoRepository.findAndCount({
    skip: offset,
    take: limite,
  });
  return result;
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