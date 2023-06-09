import {Request, Response, Router} from 'express'
import Produto from '../entities/Produto';
import Categoria from '../../Categoria/entities/Categoria';
import ProdutoRepository from '../repository/ProdutoRepository';
import IProduto from '../interfaces/IProduto';



const produtoRouter = Router();

produtoRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const produtos = await ProdutoRepository.getProduto();
  return res.status(200).json(produtos);
});

produtoRouter.get('/:id/',async(req:Request, res:Response): Promise<Response> =>{
    const id = parseInt(req.params.id)
    const produto = await ProdutoRepository.getProdutoById(id)
    return res.status(200).json(produto);
})

produtoRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    const { nome, descricao, foto, preco, quantidade,categoria} = req.body;
    const produto = new Produto();
    produto.nome = nome;
    produto.descricao = descricao;
    produto.foto = foto;
    produto.preco = preco;
    produto.quantidade = quantidade;
    produto.categoria= categoria;
    produto.criadoEm = new Date();
  
    const produtoNovo = await ProdutoRepository.postProduto(produto);
    res.send(produtoNovo);
  });

  produtoRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { nome, descricao, foto, preco, quantidade,categoria } = req.body;
  const produto: IProduto = {
    nome,
    descricao,
    foto,
    preco,
    quantidade,
    categoria,
    atualizadoEm: new Date(),
  };
  
  const produtoAtualizado = await ProdutoRepository.updateProduto(id, produto);
  if (produtoAtualizado) {
    return res.status(200).json(produtoAtualizado);
  } else {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
});

  produtoRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    await ProdutoRepository.deletarProduto(id);
    res.send('Produto excluído com sucesso');
  });

export default produtoRouter;
