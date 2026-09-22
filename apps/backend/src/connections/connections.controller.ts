import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConnectionsService } from './connections.service';

@ApiTags('connections')
@ApiBearerAuth()
@Controller('connections')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  // GET /connections
  // GET /connections/:connectionId
  // DELETE /connections/:connectionId (Unconnect)
}
