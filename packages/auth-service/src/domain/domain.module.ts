import { ApolloFederationDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DbModule } from 'src/db/db.module';
import { UserEntity } from './users/enity/user.entity';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloFederationDriver,
      context: ({ req }: any) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    DbModule.forRoot({
      entities: [UserEntity],
    }),
  ],
  controllers: [],
  exports: [],
  providers: [],
})
export class DomainModule {}
