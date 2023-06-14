import Produto from "../entities/Produto";
import IProduto from "../interfaces/IProduto";
import { AppDataSource } from "../../../database/data-source";
import { FindOneOptions } from "typeorm";

const produtoRepository = AppDataSource.getRepository(Produto);

const getProdutos = (): Promise<Produto[]> => {
  return produtoRepository.find({ relations: ["categoria"] });
};

const getProdutoById = (id: number): Promise<Produto | null> => {
  const options: FindOneOptions<Produto> = {
    where: { id: id },
    relations: ["categoria"],
  };

  return produtoRepository.findOne(options);
};

const postProduto = (produto: IProduto): Promise<Produto> => {
  return produtoRepository.save(produto);
};

const updateProduto = async (id: number, produto: IProduto): Promise<Produto | null> => {
  const options: FindOneOptions<Produto> = {
    where: { id: id },
    relations: ["categoria"],
  };
  const produtoExistente = await produtoRepository.findOne(options);

  if (produtoExistente) {
    Object.assign(produtoExistente, produto);
    return produtoRepository.save(produtoExistente);
  }

  return null;
};

const deletarProduto = async (id: number): Promise<Produto | null> => {
  const options: FindOneOptions<Produto> = {
    where: { id: id },
    relations: ["categoria"],
  };
  const produto = await produtoRepository.findOne(options);

  if (produto) {
    await produtoRepository.remove(produto);
    return produto;
  }

  return null;
};

export default { getProdutos, getProdutoById, postProduto, deletarProduto, updateProduto };
