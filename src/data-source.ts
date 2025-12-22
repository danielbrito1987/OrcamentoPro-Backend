import 'reflect-metadata';
import { DataSource } from 'typeorm';
// Importe outras entidades...

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'orcamentopro.vpscronos1173.mysql.dbaas.com.br',
    port: 3306,
    database: 'orcamentopro',
    username: 'orcamentopro',
    password: 'Orc@m4nt0@2025',
    // O CLI roda em ambiente Node/TS, então apontamos para os arquivos .ts
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    ssl: false
});

console.log(AppDataSource.options.entities);