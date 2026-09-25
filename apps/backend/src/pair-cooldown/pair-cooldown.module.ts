import { Module } from '@nestjs/common';
import { PairCooldownService } from './pair-cooldown.service';

@Module({
  providers: [PairCooldownService],
  exports: [PairCooldownService],
})
export class PairCooldownModule {}
