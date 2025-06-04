import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    {
      provide: 'PUB_SUB', // token
      useValue: new PubSub(), //instance
    },
  ],
  exports: ['PUB_SUB'],
})
export class SharedModule {}
