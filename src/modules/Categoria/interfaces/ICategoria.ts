import IProduto from "../../Produtos/interfaces/IProduto";

interface ICategoria {
    id?: number;
    nome: string;
    criadoEm?: Date;
    atualizadoEm?: Date;
    deletadoEm?: Date;
    produtos?: IProduto[]; 
  }
  export default ICategoria;