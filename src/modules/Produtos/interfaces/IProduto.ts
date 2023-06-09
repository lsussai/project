import ICategoria from "../../Categoria/interfaces/ICategoria";

interface IProduto {
    id?:number;
    nome:string;
    descricao:string;
    foto:string;
    preco:number;
    quantidade:number;
    criadoEm?:Date;
    atualizadoEm?:Date;
    deletadoEm?:Date;
    categoria: ICategoria;
}
export default IProduto;