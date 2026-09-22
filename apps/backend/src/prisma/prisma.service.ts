import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('PostgreSQL connected');
    } catch (error) {
      this.logger.warn(
        `PostgreSQL not available yet: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
