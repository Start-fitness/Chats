import { Module } from '@nestjs/common';
import { SubscriptionModule } from './subscription.module';

@Module({
  imports: [SubscriptionModule]
})
export class ChatModule {}
