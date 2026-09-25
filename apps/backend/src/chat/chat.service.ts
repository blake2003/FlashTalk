import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  getStatus() {
    return { module: 'chat', status: 'scaffolded' };
  }
}
