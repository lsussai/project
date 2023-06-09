import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm'
import Categoria from '../../Categoria/entities/Categoria';

@Entity('produtos')
class Produto{
@PrimaryGeneratedColumn('increment')
id:number;

@Column('varchar',{length: 100})
nome:string

@Column('varchar',{length: 150})
descricao:string

@Column('varchar',{length: 255})
foto:string

@Column('float')
preco:number

@Column('int')
quantidade:number

@Column(CreateDateColumn)
criadoEm:Date

@Column(UpdateDateColumn)
atualizadoEm:Date

@Column(UpdateDateColumn)
deletadoEm:Date

@ManyToOne(() => Categoria)
@JoinColumn({ name: 'categoriaId' })
categoria: Categoria;

}


export default Produto;