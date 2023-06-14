import IProduto from "../../Produtos/interfaces/IProduto";

interface ICategoria {
    id?: number;
    nome: string;
    produtos?: IProduto[]; 
  }
  export default ICategoria;