import { Injectable } from '@nestjs/common';

@Injectable()
export class PairCooldownService {
  getStatus() {
    return { module: 'pair-cooldown', status: 'scaffolded' };
  }
}
