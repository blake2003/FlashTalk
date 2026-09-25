import { Injectable } from '@nestjs/common';

@Injectable()
export class RealtimeService {
  getStatus() {
    return { module: 'realtime', status: 'scaffolded' };
  }
}
