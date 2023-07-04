import { Request, Response, Router } from "express";
import ProdutoRepository from "../repository/ProdutoRepository";
import IProduto from "../interfaces/IProduto";
import Authenticate from "../../../middleware/Authenticate";


const produtoRouter = Router();

produtoRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { pagina = 1, limite = 5 } = req.query;

    const produtos = await ProdutoRepository.getProduto(Number(pagina), Number(limite));

    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});





produtoRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const produto = await ProdutoRepository.getProdutoById(id);
  if (produto) {
    return res.status(200).json(produto);
  } else {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
});

produtoRouter.post('/',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const { nome, descricao, foto, preco, quantidade, categoriaId } = req.body;
  const produto: IProduto = {
    nome,
    descricao,
    foto,
    preco,
    quantidade,
    categoriaId,
  };

  const produtoNovo = await ProdutoRepository.postProduto(produto);
  return res.status(201).json(produtoNovo);
});

produtoRouter.put('/:id', Authenticate,async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { nome, descricao, foto, preco, quantidade, categoriaId } = req.body;
  const produto: IProduto = {
    nome,
    descricao,
    foto,
    preco,
    quantidade,
    categoriaId,
  };

  const produtoAtualizado = await ProdutoRepository.updateProduto(id, produto);
  if (produtoAtualizado) {
    return res.status(200).json(produtoAtualizado);
  } else {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
});

produtoRouter.delete('/:id',Authenticate, async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const produtoDeletado = await ProdutoRepository.deletarProduto(id);
  if (produtoDeletado) {
    return res.status(200).json({ message: 'Produto excluído com sucesso' });
  } else {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
});

export default produtoRouter;