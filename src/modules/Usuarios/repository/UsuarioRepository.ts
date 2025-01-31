import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../../../database/data-source";
import Usuario from "../entities/Usuario";
import IUsuario from "../interfaces/IUsuario";

const usuarioRepository = AppDataSource.getRepository(Usuario);

const getUsuarios = (offset: number, limit: number): Promise<Usuario[]> => {
  return usuarioRepository.find({
    skip: offset,
    take: limit,
  });
};

const getUsuarioById = (id: number): Promise<Usuario | null> => {
  const options: FindOneOptions<Usuario> = {
    where: { id: id },
  };

  return usuarioRepository.findOne(options);
};

const postUsuario = (usuario: IUsuario): Promise<Usuario> => {
  return usuarioRepository.save(usuario);
};

const updateUsuario = async (id: number, usuario: IUsuario): Promise<Usuario | null> => {
  const options: FindOneOptions<Usuario> = {
    where: { id: id },
  };
  const usuarioExistente = await usuarioRepository.findOne(options);

  if (usuarioExistente) {
    Object.assign(usuarioExistente, usuario);
    return usuarioRepository.save(usuarioExistente);
  }

  return null;
};

const deletarUsuario = async (id: number): Promise<Usuario | null> => {
  const options: FindOneOptions<Usuario> = {
    where: { id: id },
  };
  const usuario = await usuarioRepository.findOne(options);

  if (usuario) {
    await usuarioRepository.remove(usuario);
    return usuario;
  }

  return null;
};

export default { getUsuarios, getUsuarioById, postUsuario, deletarUsuario, updateUsuario };