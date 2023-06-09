import Categoria from "../entities/Categoria";
import ICategoria from "../interfaces/ICategoria";
import { AppDataSource } from "../../../database/data-source";
import { FindOneOptions, Repository } from "typeorm";

const categoriaRepository = AppDataSource.getRepository(Categoria);

const getCategoria = (): Promise<ICategoria[]> => {
  return categoriaRepository.find({ relations: ["produtos"] });
};

const getCategoriaById = (id: number): Promise<ICategoria | null> => {
  const options: FindOneOptions<Categoria> = {
    where: { id: id },
    relations: ["produtos"],
  };

  return categoriaRepository.findOne(options);
};

const postCategoria = (categoria: ICategoria): Promise<ICategoria> => {
  return categoriaRepository.save(categoria);
};

const updateCategoria = async (id: number, categoria: ICategoria): Promise<ICategoria | null> => {
     const options: FindOneOptions<Categoria> = {
    where: { id: id },
    relations: ["produtos"],
  };
  const categoriaExistente = await categoriaRepository.findOne(options);

  if (categoriaExistente) {
    Object.assign(categoriaExistente, categoria);
    return categoriaRepository.save(categoriaExistente);
  }

  return null;
};

const deletarCategoria = async (id: number): Promise<ICategoria | null> => {
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
