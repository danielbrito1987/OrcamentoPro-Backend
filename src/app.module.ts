import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'orcamentopro.vpscronos1173.mysql.dbaas.com.br',
      port: 3306,
      database: 'orcamentopro',
      username: 'orcamentopro',
      password: 'Orc@m4nt0@2025',
      autoLoadEntities: true,
      synchronize: false, // ⚠️ bom só para desenvolvimento!
      ssl: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
