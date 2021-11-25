import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createUserProfile1637775857589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_profile",
            columns: [
                {
                    name: "id", 
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "user_id", 
                    type: "int",
                },
                {
                    name: "profile_id", 
                    type: "int",
                },
            ]
        }), true)

        await queryRunner.createForeignKey("user_profile", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("user_profile", new TableForeignKey({
            columnNames: ["profile_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "profile",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_profile");
        
        const profileId = table.foreignKeys.find(fk => fk.columnNames.indexOf("profile_id") !== -1);
        await queryRunner.dropForeignKey("user_profile", profileId);
        
        const userId = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        await queryRunner.dropForeignKey("user_profile", userId);

        await queryRunner.dropTable("user_profile");
    }
}