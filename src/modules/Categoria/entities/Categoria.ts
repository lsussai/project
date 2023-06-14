import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import Produto from '../../Produtos/entities/Produto';

@Entity('categorias')
class Categoria{
@PrimaryGeneratedColumn('increment')
id:number;

@Column('varchar',{length: 100})
nome:string;


@OneToMany(() => Produto, produto => produto.categoria)
produtos?: Produto[];

}

export default Categoria;