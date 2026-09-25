import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

/**
 * Socket.IO namespace: /chat
 * Handshake: auth.accessToken
 *
 * Client → Server:
 *   matching.join | matching.cancel
 *   chat.sendMessage | chat.typing | chat.leave
 *   chat.connectionDecision | chat.sync
 *
 * Server → Client:
 *   matching.found | chat.message | chat.typing
 *   chat.sessionState | chat.connectionDecisionResult | chat.roomClosed
 */
@WebSocketGateway({
  namespace: '/chat',
  cors: { origin: true, credentials: true },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    // TODO: validate JWT from client.handshake.auth.accessToken
    this.logger.debug(`socket connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`socket disconnected: ${client.id}`);
  }

  @SubscribeMessage('matching.join')
  handleMatchingJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() _payload: unknown,
  ) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }

  @SubscribeMessage('matching.cancel')
  handleMatchingCancel(@ConnectedSocket() client: Socket) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }

  @SubscribeMessage('chat.sendMessage')
  handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() _payload: unknown,
  ) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }

  @SubscribeMessage('chat.typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() _payload: unknown,
  ) {
    return { ok: true, socketId: client.id };
  }

  @SubscribeMessage('chat.leave')
  handleLeave(@ConnectedSocket() client: Socket) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }

  @SubscribeMessage('chat.connectionDecision')
  handleConnectionDecision(
    @ConnectedSocket() client: Socket,
    @MessageBody() _payload: unknown,
  ) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }

  @SubscribeMessage('chat.sync')
  handleSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() _payload: unknown,
  ) {
    return { ok: false, error: 'NOT_IMPLEMENTED', socketId: client.id };
  }
}
