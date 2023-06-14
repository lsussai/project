import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import Categoria from '../../Categoria/entities/Categoria';
import Usuario from '../../Usuarios/entities/Usuario';

@Entity('produtos')
class Produto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  nome: string;

  @Column('varchar', { length: 150 })
  descricao: string;

  @Column('varchar', { length: 255 })
  foto: string;

  @Column('float')
  preco: number;

  @Column('int')
  quantidade: number;
  @Column('int')
  categoriaId: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;
}

export default Produto;