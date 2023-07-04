import Produto from "../entities/Produto";
import IProduto from "../interfaces/IProduto";
import { AppDataSource } from "../../../database/data-source";
import { FindOneOptions } from "typeorm";

const produtoRepository = AppDataSource.getRepository(Produto);

const getProduto = async (pagina: number, limite: number): Promise<Produto[]> => {
  const offset = (pagina - 1) * limite;
  const [result, count] = await produtoRepository.findAndCount({
    skip: offset,
    take: limite,
  });
  return result;
};

const getProdutoById = (id: number): Promise<Produto | null> => {
  const options: FindOneOptions<Produto> = {
    where: { id: id },
  
  };

  return produtoRepository.findOne(options);
};

const postProduto = (produto: IProduto): Promise<Produto> => {
  return produtoRepository.save(produto);
};

const updateProduto = async (id: number, produto: IProduto): Promise<Produto | null> => {
  const options: FindOneOptions<Produto> = {
    where: { id: id },
    
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
    
  };
  const produto = await produtoRepository.findOne(options);
 
  if (produto) {
    await produtoRepository.remove(produto);
    return produto;
  }

  return null;
};

export default { getProduto, getProdutoById, postProduto, deletarProduto, updateProduto };
