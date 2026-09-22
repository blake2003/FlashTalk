# FlashTalk v1.6.0 MVP

依《FlashTalk v1.6.0 MVP 技術規格書》初始化的 monorepo。

## 架構

```text
FlashTalk/
├── apps/
│   ├── backend/     # NestJS + Prisma + Socket.IO
│   └── mobile/      # React Native (Expo Router)
├── docker-compose.yml
├── Flashtalk_prd_V1.6.0.md
└── FlashTalk_v1.6.0_MVP_技術規格書.md
```

| Layer | Stack |
|---|---|
| App | Expo + Expo Router + TanStack Query + Zustand + Socket.IO Client |
| API | NestJS + REST `/api/v1` + Socket.IO `/chat` |
| DB | PostgreSQL + Prisma |
| Auth | JWT Access / Refresh（骨架，Phase 1 實作） |

## 設計邏輯

- **Modular Monolith**：Backend 依規格拆成 Auth / Users / Interests / Matching / Chat / Connections / PairCooldown / Upload / Mail / Realtime / Scheduler / Health。
- **Server Authoritative**：配對、Session 計時、Connection 結果皆以 Server 為準；Client 僅送意圖。
- **MVP 約束**：單 Backend Instance、記憶體 Matching Queue、Session #1 = 10 分鐘、無 Session #2。

## 快速開始

### 1. 啟動 PostgreSQL

需先啟動 Docker Desktop / OrbStack，再執行：

```bash
docker compose up -d postgres
```

### 2. Backend

```bash
cp apps/backend/.env.example apps/backend/.env
cd apps/backend
npm install
npx prisma migrate deploy
npm run prisma:seed
npm run start:dev
```


- API：`http://localhost:3000/api/v1`
- Swagger：`http://localhost:3000/docs`
- Health：`GET /api/v1/health/live`、`GET /api/v1/health/ready`

### 3. Mobile

```bash
cp apps/mobile/.env.example apps/mobile/.env
cd apps/mobile
npm install
npm start
```

iOS Simulator 連本機 API 時，可將 `EXPO_PUBLIC_API_BASE_URL` 設為 `http://localhost:3000/api/v1`；實體裝置請改成電腦區網 IP。

## 開發階段（對應規格 §16.1）

| Phase | 內容 | 狀態 |
|---|---|---|
| 0 | Repo、ENV、DB、Swagger、模組骨架 | ✅ 已完成 |
| 1 | Auth / Email / JWT | 待實作 |
| 2 | Profile / Interest / Avatar | 待實作 |
| 3 | Matching Queue | 待實作 |
| 4 | Chat Session / Message | 待實作 |
| 5 | Reconnect / Sync | 待實作 |
| 6 | Connection Decision | 待實作 |
| 7 | Pair Cooldown / Unconnect | 待實作 |
| 8 | Observability / Rate Limit | 待實作 |
| 9 | E2E / Hardening | 待實作 |

## 常用指令（repo root）

```bash
npm run db:up
npm run db:migrate
npm run db:seed
npm run dev:api
npm run dev:app
```
