import { Request, Response, Router } from 'express';
import UsuarioRepository from '../repository/UsuarioRepository';
import IUsuario from '../interfaces/IUsuario';




const usuarioRouter = Router();

usuarioRouter.get('/', async (_req: Request, res: Response): Promise<Response> => {
  const usuarios = await UsuarioRepository.getUsuarios();
  return res.status(200).json(usuarios);
});

usuarioRouter.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const usuario = await UsuarioRepository.getUsuarioById(id);
  if (usuario) {
    return res.status(200).json(usuario);
  } else {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

usuarioRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  const { nome, email, senha, isAdmin } = req.body;
  const usuario: IUsuario = {
    nome,
    email,
    senha,
    isAdmin,
  };

  const usuarioNovo = await UsuarioRepository.postUsuario(usuario);
  return res.status(201).json(usuarioNovo);
});

usuarioRouter.put('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { nome, email, senha, isAdmin } = req.body;
  const usuario: IUsuario = {
    nome,
    email,
    senha,
    isAdmin,
  };

  const usuarioAtualizado = await UsuarioRepository.updateUsuario(id, usuario);
  if (usuarioAtualizado) {
    return res.status(200).json(usuarioAtualizado);
  } else {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

usuarioRouter.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const usuarioDeletado = await UsuarioRepository.deletarUsuario(id);
  if (usuarioDeletado) {
    return res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } else {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
});

export default usuarioRouter;
