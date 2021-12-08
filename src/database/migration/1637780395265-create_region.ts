import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createRegion1637780395265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "region",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "countryId", 
                    type: "int",
                },

            ]
        }), true)

        await queryRunner.createForeignKey("region", new TableForeignKey({
            columnNames: ["countryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "country",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("region");

        const countryID = table.foreignKeys.find(fk => fk.columnNames.indexOf("countryId") !== -1);
        await queryRunner.dropForeignKey("region", countryID);

        await queryRunner.dropTable("region");
    }

}
