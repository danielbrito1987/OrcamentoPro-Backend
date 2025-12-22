import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1766265548185 implements MigrationInterface {
    name = 'InitSchema1766265548185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(150) NOT NULL, \`document\` varchar(150) NOT NULL, \`phone\` varchar(20) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(150) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_57ea953bca770f3a172eed4ee7\` (\`document\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget_items\` (\`id\` varchar(36) NOT NULL, \`budgetId\` varchar(255) NOT NULL, \`productId\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`companyId\` varchar(255) NOT NULL, \`type\` enum ('PRODUCT', 'SERVICE') NOT NULL, \`description\` varchar(150) NOT NULL, \`value\` decimal(10,2) NOT NULL, \`unit\` varchar(10) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`budget\` (\`id\` varchar(36) NOT NULL, \`companyId\` varchar(255) NOT NULL, \`clientName\` varchar(150) NOT NULL, \`clientPhone\` varchar(20) NOT NULL, \`clientEmail\` varchar(150) NOT NULL, \`address\` varchar(150) NOT NULL, \`city\` varchar(150) NOT NULL, \`state\` varchar(10) NOT NULL, \`notes\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`budget\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`budget_items\``);
        await queryRunner.query(`DROP INDEX \`IDX_57ea953bca770f3a172eed4ee7\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
