import { MigrationInterface, QueryRunner } from "typeorm";

export class PlacesTable1711629654966 implements MigrationInterface {
    name = 'PlacesTable1711629654966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "place" (
                "id" uuid NOT NULL,
                "name" character varying(64) NOT NULL,
                "cep" integer NOT NULL,
                "street" character varying(128) NOT NULL,
                "number" integer NOT NULL,
                "neighborhood" character varying(64) NOT NULL,
                "city" character varying(64) NOT NULL,
                "state" character varying(64) NOT NULL,
                "company_id" uuid,
                CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "place"
            ADD CONSTRAINT "FK_102b98c22cf283ef6de77e41841" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "place" DROP CONSTRAINT "FK_102b98c22cf283ef6de77e41841"
        `);
        await queryRunner.query(`
            DROP TABLE "place"
        `);
    }

}
