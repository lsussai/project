import { Request, Response, Router, query } from 'express';
import Categoria from '../entities/Categoria';
import CategoriaRepository from '../repositories/CategoriaRepository';
import ICategoria from '../interfaces/ICategoria';
import Authenticate from '../../../Middleware/Authenticate';

const categoriaRouter = Router();

categoriaRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  const { page = '1', limit = '10' } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    const categorias = await CategoriaRepository.getCategoria(offset, Number(limit));
    return res.status(200).json(categorias);
  } catch (error) {
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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

categoriaRouter.post('/', Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const { nome } = req.body;
  const categoria: ICategoria = {
    nome,
  };

  const categoriaNova = await CategoriaRepository.postCategoria(categoria);
  return res.status(201).json(categoriaNova);
});

categoriaRouter.put('/:id', Authenticate, async (req: Request, res: Response): Promise<Response> => {
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

categoriaRouter.delete('/:id', Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const categoriaDeletada = await CategoriaRepository.deletarCategoria(id);
  if (categoriaDeletada) {
    return res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } else {
    return res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

export default categoriaRouter;
