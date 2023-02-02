import { MigrationInterface, QueryRunner } from "typeorm";

export class ImagesCreateDate1675346014917 implements MigrationInterface {
    name = 'ImagesCreateDate1675346014917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "created_at"`);
    }

}
