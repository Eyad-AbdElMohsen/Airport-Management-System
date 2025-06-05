import { Module } from '@nestjs/common';
import { GqlConfigService } from './gql.config';
import { JWT } from 'src/common/utils/jwt';

@Module({
  providers: [GqlConfigService, JWT],
  exports: [GqlConfigService],
})
export class GqlConfigModule {}