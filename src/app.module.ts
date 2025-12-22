import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CompanyController } from './modules/company/company.controller';
import { CompanyService } from './modules/company/company.service';
import { CompanyModule } from './modules/company/company.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';

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
      entities: [__dirname + '/models/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
    AuthModule,
    CompanyModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
