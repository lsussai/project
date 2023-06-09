import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import Produto from '../../Produtos/entities/Produto';

@Entity('categorias')
class Categoria{
@PrimaryGeneratedColumn('increment')
id:number;

@Column('varchar',{length: 100})
nome:string

@Column(CreateDateColumn)
criadoEm:Date

@Column(UpdateDateColumn)
atualizadoEm:Date

@Column(UpdateDateColumn)
deletadoEm:Date

@OneToMany(() => Produto, produto => produto.categoria)
produtos: Produto[];

}

export default Categoria;