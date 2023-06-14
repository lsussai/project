import { Request, Response, Router } from 'express';
import Categoria from '../entities/Categoria';
import CategoriaRepository from '../repositories/CategoriaRepository';
import ICategoria from '../interfaces/ICategoria';

const categoriaRouter = Router();

categoriaRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const categorias = await CategoriaRepository.getCategoria();
  return res.status(200).json(categorias);
});

categoriaRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const categoria = await CategoriaRepository.getCategoriaById(id);
  if (categoria) {
    return res.status(200).json(categoria);
  } else {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

categoriaRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.body;
  const categoria: ICategoria = {
    nome,
  };

  const categoriaNova = await CategoriaRepository.postCategoria(categoria);
  return res.status(201).json(categoriaNova);
});

categoriaRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { nome } = req.body;
  const categoria: ICategoria = {
    nome,
  };

  const categoriaAtualizada = await CategoriaRepository.updateCategoria(id, categoria);
  if (categoriaAtualizada) {
    return res.status(200).json(categoriaAtualizada);
  } else {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

categoriaRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const categoriaDeletada = await CategoriaRepository.deletarCategoria(id);
  if (categoriaDeletada) {
    return res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } else {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

export default categoriaRouter;
