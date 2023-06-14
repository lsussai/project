import { IsNull, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CriarProdutoCategoriaTabela1686159829779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(
            new Table({
                name: 'produtos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '150',
                        isNullable: false
                    },
                    {
                        name: 'foto',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'preco',
                        type: 'float',
                        isNullable: false
                    },
                    {
                        name: 'quantidade',
                        type: 'int',
                        isNullable: false
                    },
                    new TableColumn({
                        name: 'categoriaId',
                        type: 'int',
                        isNullable: false
                    })
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'categorias',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    

                ]
            })
        );

        await queryRunner.createForeignKey(
            'produtos',
            new TableForeignKey({
                columnNames: ['categoriaId'],
                referencedTableName: 'categorias',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'senha',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'isAdmin',
                        type: 'boolean',
                        default: false,
                        isNullable: false
                    },
                    
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'pedidos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'usuarioId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'produtoId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'quantidade',
                        type: 'int',
                        isNullable: false
                    },

                ]
            })
        );

        await queryRunner.createForeignKey(
            'pedidos',
            new TableForeignKey({
                columnNames: ['usuarioId'],
                referencedTableName: 'usuarios',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'pedidos',
            new TableForeignKey({
                columnNames: ['produtoId'],
                referencedTableName: 'produtos',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }
    


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
