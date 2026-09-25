import { Injectable } from '@nestjs/common';

@Injectable()
export class MatchingService {
  getStatus() {
    return { module: 'matching', status: 'scaffolded' };
  }
}
