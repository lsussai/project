import { Request, Response, Router } from "express";
import UsuarioRepository from "../repository/UsuarioRepository";
import IUsuario from "../interfaces/IUsuario";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import "dotenv/config";

const loginAuthRouter = Router();

loginAuthRouter.post(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    console.log(req.body);
    const { email, senha } = req.body;
    const usuario: IUsuario = {
      email,
      senha,
    };

    const usuarioBanco = await UsuarioRepository.getUsuarioByParams(
      email,
      senha
    );

    if (usuarioBanco) 
    {
        const user = {
            nome:usuarioBanco.nome,
            email:usuarioBanco.email,

        }
        const token = jwt.sign(user, String(process.env.SECRET), {
            expiresIn: '2 days',
        });
        return res.status(200).json({
            user: user,
            token:token
        });
    }
    else
    {
        return res.status(401).json({error:"não autorizado"})
    }
  }
);

export default loginAuthRouter;
