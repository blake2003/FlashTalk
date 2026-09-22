import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('chat-rooms')
@ApiBearerAuth()
@Controller('chat-rooms')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // GET /chat-rooms/:roomId
  // GET /chat-rooms/:roomId/messages?cursor=&limit=50
}
