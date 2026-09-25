import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getStatus() {
    return { module: 'upload', status: 'scaffolded' };
  }
}
