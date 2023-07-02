import { Request, Response, Router} from 'express';
import ProdutoRepository from '../repository/ProdutoRepository';
import IProduto from '../interfaces/IProduto';
import jwt, { Secret, JwtPayload} from 'jsonwebtoken';

