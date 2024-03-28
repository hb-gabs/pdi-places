import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersTable1711629411048 implements MigrationInterface {
    name = 'UsersTable1711629411048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL,
                "name" character varying(64) NOT NULL,
                "email" character varying(64) NOT NULL,
                "password" character varying(255) NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
