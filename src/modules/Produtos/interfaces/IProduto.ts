import ICategoria from "../../Categoria/interfaces/ICategoria";

interface IProduto {
    id?: number;
    nome: string;
    descricao: string;
    foto: string;
    preco: number;
    quantidade: number;
    categoriaId: number;

  }
  
  export default IProduto;