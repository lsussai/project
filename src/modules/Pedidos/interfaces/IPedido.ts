import IProduto from "../../Produtos/interfaces/IProduto";

interface IPedido {
    id?: number;
    usuarioId: number;
    produtoId: number;
    quantidade: number;

  }
  
  export default IPedido;