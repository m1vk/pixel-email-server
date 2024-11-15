import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./apps/admin_api/**/*.gql'],
  path: join(process.cwd(), 'apps/admin_api/src/utils/graphql/types/graphql.ts'),
  outputAs: 'class',
  debug: false,
});
