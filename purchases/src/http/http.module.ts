import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from '../database/database.module';
import { MessagingModule } from '../messaging/messaging.module';
import { CustomersService } from '../services/customers.service';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { CustomersResolver } from './graphql/resolvers/customer.resolver';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
