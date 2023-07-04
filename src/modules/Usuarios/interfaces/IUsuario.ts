interface IUsuario {
    id?: number;
    nome?: string;
    email: string;
    senha: string;
    isAdmin?: boolean;
}
export default IUsuario;