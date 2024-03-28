import { MigrationInterface, QueryRunner } from "typeorm";

export class CompaniesTable1711629434664 implements MigrationInterface {
    name = 'CompaniesTable1711629434664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "company" (
                "id" uuid NOT NULL,
                "name" character varying(64) NOT NULL,
                "cnpj" integer NOT NULL,
                "website" character varying(128),
                "owner_id" uuid,
                CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "company"
            ADD CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "company" DROP CONSTRAINT "FK_0c6ea8a32565efcb512e572d61d"
        `);
        await queryRunner.query(`
            DROP TABLE "company"
        `);
    }

}
