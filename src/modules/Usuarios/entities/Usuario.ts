import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  nome: string;

  @Column('varchar', { length: 100 })
  email: string;

  @Column('varchar', { length: 255 })
  senha: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;
}

export default Usuario;
