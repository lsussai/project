import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Usuario from '../../Usuarios/entities/Usuario';
import Produto from '../../Produtos/entities/Produto';

@Entity('pedidos')
class Pedido {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  usuarioId: number;

  @Column('int')
  produtoId: number;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produtoId' })
  produto: Produto;
}

export default Pedido;