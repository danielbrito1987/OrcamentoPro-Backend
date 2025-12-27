import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBudgetItemsRelation1766746706961 implements MigrationInterface {
    name = 'AddBudgetItemsRelation1766746706961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`clientPhone\` \`clientPhone\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`clientEmail\` \`clientEmail\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`address\` \`address\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`city\` \`city\` varchar(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`state\` \`state\` varchar(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`budget_items\` ADD CONSTRAINT \`FK_1160fb85bb3cb492ac954b491a9\` FOREIGN KEY (\`budgetId\`) REFERENCES \`budget\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget_items\` DROP FOREIGN KEY \`FK_1160fb85bb3cb492ac954b491a9\``);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`state\` \`state\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`city\` \`city\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`address\` \`address\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`clientEmail\` \`clientEmail\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`clientPhone\` \`clientPhone\` varchar(20) NULL`);
    }

}
