import { Injectable } from '@nestjs/common';

@Injectable()
export class ConnectionsService {
  getStatus() {
    return { module: 'connections', status: 'scaffolded' };
  }
}
