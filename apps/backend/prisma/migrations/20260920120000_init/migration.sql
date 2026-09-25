-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'BANNED', 'DELETED');

-- CreateEnum
CREATE TYPE "EmailVerificationPurpose" AS ENUM ('VERIFY_EMAIL', 'RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "MatchingMode" AS ENUM ('RANDOM', 'INTEREST');

-- CreateEnum
CREATE TYPE "MatchingEntryStatus" AS ENUM ('QUEUED', 'MATCHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ChatRoomType" AS ENUM ('MATCH', 'CONNECTION');

-- CreateEnum
CREATE TYPE "ChatRoomStatus" AS ENUM ('ACTIVE', 'WAITING_CONNECTION_DECISION', 'CONNECTED', 'EARLY_ENDED', 'ABNORMAL_ENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "ChatSessionStatus" AS ENUM ('ACTIVE', 'ENDED', 'EARLY_ENDED', 'ABNORMAL_ENDED');

-- CreateEnum
CREATE TYPE "SessionEndedReason" AS ENUM ('EXPIRED', 'USER_LEFT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'EMOJI');

-- CreateEnum
CREATE TYPE "ConnectionDecisionValue" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('ACTIVE', 'UNCONNECTED');

-- CreateEnum
CREATE TYPE "PairCooldownType" AS ENUM ('STANDARD', 'POST_CHAT', 'EXTENDED');

-- CreateEnum
CREATE TYPE "PairCooldownReason" AS ENUM ('CONNECTION_REJECTED', 'EARLY_END', 'UNCONNECT', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "email_verified_at" TIMESTAMPTZ(3),
    "status" "AccountStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "nickname" VARCHAR(50),
    "avatar_url" TEXT,
    "last_active_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "deleted_at" TIMESTAMPTZ(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interests" (
    "id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_interests" (
    "user_id" UUID NOT NULL,
    "interest_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_interests_pkey" PRIMARY KEY ("user_id","interest_id")
);

-- CreateTable
CREATE TABLE "email_verifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "code_hash" VARCHAR(255) NOT NULL,
    "purpose" "EmailVerificationPurpose" NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "attempt_count" INTEGER NOT NULL DEFAULT 0,
    "verified_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "revoked_at" TIMESTAMPTZ(3),
    "device_id" VARCHAR(128),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matching_entries" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "mode" "MatchingMode" NOT NULL,
    "selected_interest_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "MatchingEntryStatus" NOT NULL DEFAULT 'QUEUED',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "matching_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_rooms" (
    "id" UUID NOT NULL,
    "room_type" "ChatRoomType" NOT NULL,
    "match_mode" "MatchingMode",
    "user_a_id" UUID NOT NULL,
    "user_b_id" UUID NOT NULL,
    "status" "ChatRoomStatus" NOT NULL,
    "connection_id" UUID,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connected_at" TIMESTAMPTZ(3),
    "closed_at" TIMESTAMPTZ(3),
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_sessions" (
    "id" UUID NOT NULL,
    "chat_room_id" UUID NOT NULL,
    "session_no" SMALLINT NOT NULL DEFAULT 1,
    "status" "ChatSessionStatus" NOT NULL DEFAULT 'ACTIVE',
    "started_at" TIMESTAMPTZ(3) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "ended_at" TIMESTAMPTZ(3),
    "ended_reason" "SessionEndedReason",
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "chat_room_id" UUID NOT NULL,
    "chat_session_id" UUID,
    "sender_id" UUID NOT NULL,
    "message_type" "MessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "reply_to_message_id" UUID,
    "client_message_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_decisions" (
    "id" UUID NOT NULL,
    "chat_room_id" UUID NOT NULL,
    "chat_session_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "decision" "ConnectionDecisionValue" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "connection_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" UUID NOT NULL,
    "user_low_id" UUID NOT NULL,
    "user_high_id" UUID NOT NULL,
    "source_chat_room_id" UUID NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disconnected_at" TIMESTAMPTZ(3),

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pair_cooldowns" (
    "id" UUID NOT NULL,
    "user_low_id" UUID NOT NULL,
    "user_high_id" UUID NOT NULL,
    "type" "PairCooldownType" NOT NULL,
    "reason" "PairCooldownReason" NOT NULL,
    "starts_at" TIMESTAMPTZ(3) NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pair_cooldowns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_last_active_at_idx" ON "users"("last_active_at");

-- CreateIndex
CREATE UNIQUE INDEX "interests_code_key" ON "interests"("code");

-- CreateIndex
CREATE INDEX "email_verifications_user_id_idx" ON "email_verifications"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_hash_idx" ON "refresh_tokens"("token_hash");

-- CreateIndex
CREATE UNIQUE INDEX "matching_entries_user_id_key" ON "matching_entries"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_rooms_connection_id_key" ON "chat_rooms"("connection_id");

-- CreateIndex
CREATE INDEX "chat_rooms_user_a_id_status_idx" ON "chat_rooms"("user_a_id", "status");

-- CreateIndex
CREATE INDEX "chat_rooms_user_b_id_status_idx" ON "chat_rooms"("user_b_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "chat_sessions_chat_room_id_session_no_key" ON "chat_sessions"("chat_room_id", "session_no");

-- CreateIndex
CREATE INDEX "messages_chat_room_id_created_at_idx" ON "messages"("chat_room_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "messages_chat_session_id_created_at_idx" ON "messages"("chat_session_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "messages_sender_id_client_message_id_key" ON "messages"("sender_id", "client_message_id");

-- CreateIndex
CREATE UNIQUE INDEX "connection_decisions_chat_room_id_user_id_key" ON "connection_decisions"("chat_room_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "connections_source_chat_room_id_key" ON "connections"("source_chat_room_id");

-- CreateIndex
CREATE INDEX "connections_user_low_id_user_high_id_status_idx" ON "connections"("user_low_id", "user_high_id", "status");

-- CreateIndex
CREATE INDEX "pair_cooldowns_user_low_id_user_high_id_expires_at_idx" ON "pair_cooldowns"("user_low_id", "user_high_id", "expires_at");

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "interests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matching_entries" ADD CONSTRAINT "matching_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_user_a_id_fkey" FOREIGN KEY ("user_a_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_user_b_id_fkey" FOREIGN KEY ("user_b_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "connections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_sessions" ADD CONSTRAINT "chat_sessions_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_session_id_fkey" FOREIGN KEY ("chat_session_id") REFERENCES "chat_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_reply_to_message_id_fkey" FOREIGN KEY ("reply_to_message_id") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_decisions" ADD CONSTRAINT "connection_decisions_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_decisions" ADD CONSTRAINT "connection_decisions_chat_session_id_fkey" FOREIGN KEY ("chat_session_id") REFERENCES "chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_decisions" ADD CONSTRAINT "connection_decisions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_low_id_fkey" FOREIGN KEY ("user_low_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_high_id_fkey" FOREIGN KEY ("user_high_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_source_chat_room_id_fkey" FOREIGN KEY ("source_chat_room_id") REFERENCES "chat_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pair_cooldowns" ADD CONSTRAINT "pair_cooldowns_user_low_id_fkey" FOREIGN KEY ("user_low_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pair_cooldowns" ADD CONSTRAINT "pair_cooldowns_user_high_id_fkey" FOREIGN KEY ("user_high_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

