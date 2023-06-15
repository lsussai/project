import Categoria from "../entities/Categoria";
import ICategoria from "../interfaces/ICategoria";
import { AppDataSource } from "../../../database/data-source";
import { FindOneOptions, Repository } from "typeorm";

const categoriaRepository = AppDataSource.getRepository(Categoria);

const getCategoria = (offset: number, limit: number): Promise<Categoria[]> => {
  return categoriaRepository.find({
    skip: offset,
    take: limit,
  });
};

const getCategoriaById = (id: number): Promise<Categoria | null> => {
  const options: FindOneOptions<Categoria> = {
    where: { id: id },

  };

  return categoriaRepository.findOne(options);
};

const postCategoria = (categoria: ICategoria): Promise<Categoria> => {
  return categoriaRepository.save(categoria);
};


const updateCategoria = async (id: number, categoria: ICategoria): Promise<Categoria | null> => {
     const options: FindOneOptions<Categoria> = {
    where: { id: id },
 
  };
  const categoriaExistente = await categoriaRepository.findOne(options);

  if (categoriaExistente) {
    Object.assign(categoriaExistente, categoria);
    return categoriaRepository.save(categoriaExistente);
  }

  return null;
};

const deletarCategoria = async (id: number): Promise<Categoria | null> => {
     const options: FindOneOptions<Categoria> = {
    where: { id: id },
    relations: ["produtos"],
  };
  const categoria = await categoriaRepository.findOne(options);

  if (categoria) {
    await categoriaRepository.remove(categoria);
    return categoria;
  }

  return null;
};

export default { getCategoria, getCategoriaById, postCategoria, deletarCategoria, updateCategoria };
