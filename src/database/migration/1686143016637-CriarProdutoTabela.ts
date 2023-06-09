import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CriarProdutoTabela1686143016637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produtos',
                columns: [{
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy : "increment"
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
                 {
                    name: 'criadoEm',
                    type: 'date',
                    isNullable: false
                 },
                 {
                    name: 'atualizadoEm',
                    type: 'date',
                    isNullable: false
                 },
                 {
                    name: 'deletadoEm',
                    type: 'date',
                    isNullable: false
                 },
            ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
