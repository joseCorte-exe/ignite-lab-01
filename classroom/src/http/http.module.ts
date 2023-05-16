import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CoursesService } from 'src/services/courses.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { DatabaseModule } from '../database/database.module';
import { CourseResolver } from './graphql/resolver/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolver/enrollments.resolver';
import { StudentsResolver } from './graphql/resolver/students.resolver';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CourseResolver,
    EnrollmentsResolver,
    StudentsResolver,

    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
