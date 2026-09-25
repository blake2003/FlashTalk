import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { MatchingModule } from './matching/matching.module';
import { ChatModule } from './chat/chat.module';
import { ConnectionsModule } from './connections/connections.module';
import { PairCooldownModule } from './pair-cooldown/pair-cooldown.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { RealtimeModule } from './realtime/realtime.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    CommonModule,
    HealthModule,
    AuthModule,
    UsersModule,
    InterestsModule,
    MatchingModule,
    ChatModule,
    ConnectionsModule,
    PairCooldownModule,
    UploadModule,
    MailModule,
    RealtimeModule,
    SchedulerModule,
  ],
})
export class AppModule {}
