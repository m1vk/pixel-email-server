import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  providers: [AsyncLocalStorage],
  exports: [AsyncLocalStorage],
})
export class AsyncLocalStorageModule {}