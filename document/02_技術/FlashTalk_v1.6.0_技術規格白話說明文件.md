# FlashTalk v1.6.0 技術規格白話說明文件

> Version：v1.6.0  
> 對應：FlashTalk v1.6.0 MVP 技術規格書  
> 對象：第一次接觸 App、後端、資料庫與即時通訊技術規格的人

## 1. 一句話理解 FlashTalk

FlashTalk 可以想成一間「線上快速配對聊天店」。

- **React Native / Expo App**：前端。
- **NestJS Backend**：店長，真正執行所有規則。
- **PostgreSQL**：正式檔案櫃，保存帳號、聊天室、訊息、Connection 等資料。
- **Socket.IO**：一直開著的對講機，負責配對與聊天等即時事件。
- **Prisma**：Backend 與 PostgreSQL 之間的資料操作工具。
- **S3-compatible Storage**：圖片倉庫，主要存頭像。
- **Email Provider**：寄驗證碼與重設密碼郵件。

最重要的觀念是 **Server Authoritative**：App 負責顯示與提出要求，但配對結果、10 分鐘計時、聊天室狀態與 Connection 結果，都以 Server 判定為準。

## 2. 使用者使用 FlashTalk 時，背後發生什麼？

```text
註冊
↓
Email 驗證
↓
登入
↓
設定暱稱 / 頭像 / 興趣
↓
選擇「興趣配對」或「全隨機」
↓
Server 尋找另一位符合資格的使用者
↓
配對成功
↓
建立 Chat Room + Session #1
↓
10 分鐘聊天
↓
Session 結束
↓
雙方分別選 YES / NO
↓
雙方 YES → Connection → 延續原聊天室
任一 NO → 關閉 → Pair Cooldown
```

目前 MVP 只有一輪 **10 分鐘 Session #1**，沒有第二輪 Session。

## 3. App、Backend、Database 怎麼分工？

### App

使用 React Native + Expo + TypeScript。

負責登入畫面、個人資料、興趣、配對、聊天室、倒數與 Connection 畫面。

App 可以理解成「遙控器＋螢幕」，而不是裁判。例如 App 可以要求開始配對，但不能自己決定配到誰。

### Backend

使用 Node.js + NestJS + TypeScript。

負責帳號驗證、配對、聊天室、聊天時間、訊息驗證、Connection、Cooldown、權限與錯誤處理。

它是 FlashTalk 真正的大腦。

### PostgreSQL

是系統的正式記憶，例如保存：

```text
使用者
興趣
聊天室
Session
訊息
Connection
Cooldown
Token
```

重要資料不能只存在 App 或 Server Memory。

## 4. REST API 與 WebSocket 有什麼不同？

### REST API：一問一答

例如：

```text
App：我要登入
Server：登入成功

App：給我個人資料
Server：這是你的資料
```

適合登入、個人資料、興趣、Connection List 等操作。

### Socket.IO：一直保持聯絡

聊天不能一直問「有沒有新訊息？」。

因此 App 與 Server 建立持續連線：

```text
A 傳訊息
↓
Server
↓
立即通知 B
```

FlashTalk 用 Socket.IO 處理配對、訊息、Typing、Session 結束與 Connection Decision 等即時事件。

## 5. Prisma 是什麼？

流程可以看成：

```text
App
↓
NestJS
↓
Prisma
↓
PostgreSQL
```

Prisma 可以先理解為 Backend 操作 PostgreSQL 的工具與翻譯層。

## 6. 為什麼 Backend 要拆 Module？

不是建立很多 Server，而是在同一個 Backend 裡按責任分部門：

```text
AuthModule           → 登入、驗證
UsersModule          → 使用者資料
InterestsModule      → 興趣
MatchingModule       → 配對
ChatModule           → 聊天
ConnectionsModule    → Connection
PairCooldownModule   → 防止太快再次配到同一人
```

這叫 **Modular Monolith**。MVP 先維持一套 Backend，不急著做微服務。

## 7. Matching 怎麼配？

### 全隨機

Server 從目前符合資格的 RANDOM Queue 候選人中隨機選一人。

### 興趣配對

例如：

```text
A：音樂、電影、旅行
B：音樂、電影
C：音樂
D：遊戲
```

共同興趣：

```text
A + B = 2
A + C = 1
A + D = 0
```

因此 B 優先於 C，而 D 不符合。

規則：

```text
至少 1 個共同興趣
共同興趣越多越優先
同分 → 隨機
等待時間不提高優先級
沒有 Timeout
不會自動切換成全隨機
```

## 8. 為什麼配對需要 Lock / Atomic Match？

假設 A、B、C 同時配對，沒有保護可能出現：

```text
A ↔ B
A ↔ C
```

所以配對要像「搶唯一座位」：

```text
鎖住 A、B
↓
重新確認資格
↓
從 Queue 移除
↓
建立 Chat Room
↓
建立 Session
↓
成功提交
↓
通知 A、B
```

這是避免 Race Condition。

## 9. Room 和 Session 差在哪？

**Chat Room** 是房間，例如 room_001。

**Chat Session** 是房間裡的一次限時聊天。

```text
Room：room_001

Session #1
12:00 開始
12:10 結束
```

可以記成：

> Room 是教室，Session 是這堂課。

## 10. 為什麼 10 分鐘由 Server 控制？

如果相信手機自己的倒數，使用者切背景、鎖手機、斷網、App crash 都可能造成時間錯亂。

所以 Server 保存：

```text
startedAt
expiresAt
```

App 顯示：

```text
remaining = expiresAt - serverNow
```

即使 App 斷線或進背景，10 分鐘仍持續。

## 11. Connection 是什麼？

10 分鐘結束：

```text
A：YES / NO
B：YES / NO
```

只有：

```text
YES + YES
```

才建立 Connection。

Connection 可以理解成：

> 雙方都同意把一次性的陌生人聊天室，轉成可以繼續聯絡的關係。

雙方 YES 後保留 Session #1 聊天內容並繼續聊天；其他組合則不建立 Connection。

## 12. Pair Cooldown 是什麼？

A、B 剛聊完卻沒有建立 Connection，如果立刻再次配對，有可能馬上又遇到。

因此建立：

```text
A + B
↓
Pair Cooldown
↓
一段時間內不能互相配對
```

Cooldown 到期後才重新具有互配資格。

## 13. 資料表先不用背欄位

先理解責任即可：

| Table | 白話意思 |
|---|---|
| users | 使用者 |
| interests | 官方興趣 |
| user_interests | 使用者有哪些興趣 |
| email_verifications | Email 驗證 |
| refresh_tokens | 長期登入憑證 |
| matching_entries | 等待配對的人 |
| chat_rooms | 聊天室 |
| chat_sessions | 10 分鐘 Session |
| messages | 訊息 |
| connection_decisions | YES / NO |
| connections | 已建立的聯繫 |
| pair_cooldowns | 暫時不能互配的 Pair |

整體資料故事：

```text
User
↓
Matching
↓
Chat Room
↓
Chat Session
↓
Messages
↓
Connection Decision
↓
Connection / Cooldown
```

## 14. JWT 是什麼？

登入成功後 Server 發：

```text
Access Token
Refresh Token
```

Access Token 可以理解成短期通行證。之後 App 呼叫 API 時帶上 Token，Server 才知道是誰。

重要原則：

> Server 不能因為 App 自己說「我是 User A」就相信它；身分要從驗證過的 Token 判斷。

Refresh Token 則是 Access Token 過期後用來換新 Access Token 的較長期憑證。

## 15. bcrypt 是什麼？

密碼不能直接存：

```text
password = 12345678
```

而是先經過 bcrypt Hash，再保存 Hash。資料庫不應保存使用者原始密碼。

## 16. Request / Response 是什麼？

App 登入可能送：

```json
{
  "email": "user@example.com",
  "password": "example-password"
}
```

這叫 Request。

Server 回：

```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

這叫 Response。

API Specification 就是 App 與 Backend 對「怎麼問、怎麼回答」的約定。

## 17. Socket Event 是什麼？

例如：

```text
matching.join
```

表示 App 告訴 Server「我要開始配對」。

找到人後 Server 主動發：

```text
matching.found
```

聊天室還有：

```text
chat.sendMessage
chat.message
chat.sessionEnded
chat.connectionDecisionRequired
chat.connectionResult
```

可以把 Event 理解成有名字的即時通知。

## 18. ACK 是什麼？

A 傳訊息時 UI 可能先顯示：

```text
SENDING
```

Server 驗證並成功寫入 PostgreSQL 後回 ACK，App 才變成：

```text
SENT
```

ACK 就是「Server 確認已成功收到與處理」。

SENT 不代表對方已讀，MVP 也沒有 Read Receipt。

## 19. clientMessageId 與 Idempotency

網路不穩可能發生：

```text
App → Server：「你好」
Server 已保存
但 ACK 沒回到 App
App 再傳一次
```

如果沒有保護，就可能產生兩則「你好」。

因此每則訊息有 clientMessageId。相同 sender + clientMessageId 再送一次時，Server 不重新建立訊息。

這叫 **Idempotency（冪等性）**。

## 20. Transaction 是什麼？

例如雙方 YES 時要：

```text
保存 Decision
建立 Connection
更新 Room
```

不能做到一半就留下半套資料。

Transaction 的觀念：

```text
全部成功 → COMMIT
任一步失敗 → ROLLBACK
```

就像銀行轉帳不能只扣 A 的錢卻沒有加到 B。

## 21. Reconnect 為什麼重要？

聊天 App 一定會遇到 Wi-Fi 切 5G、捷運隧道、鎖屏、切背景等情況。

所以：

```text
Socket Disconnect
≠
聊天室立即結束
```

重新連線後使用 `chat.sync` 向 Server 取得：

```text
Room 狀態
Session 狀態
serverNow
expiresAt
漏掉的訊息
Decision 狀態
```

## 22. Error Code 是什麼？

不能所有錯誤都只說「發生錯誤」。

例如：

```text
AUTH_EMAIL_ALREADY_EXISTS
```

App 可以顯示 Email 已註冊。

```text
CHAT_SESSION_EXPIRED
```

App 就知道應停止傳訊息並進入下一階段。

所以 Error Code 是 Backend 告訴 App「到底發生哪一種錯誤」。

## 23. Logging / Metrics 是什麼？

Logging 是系統工作紀錄，例如：

```text
User login
matching.join
Room created
Message created
```

用於追查問題。

但 Password、OTP、Token 與完整敏感訊息內容不能直接寫進一般 Log。

Metrics 則是系統儀表板：

```text
目前 Socket 數
等待配對人數
Active Rooms
訊息速率
錯誤率
DB 延遲
Reconnect Rate
```

Health Check 則是在回答：

> Server 還活著嗎？現在可以正常接工作嗎？

## 24. 為什麼 MVP 還不用 Redis？

目前設計先以：

```text
1 × Backend
```

運作，因此 Matching Queue 可先放在 Backend Memory。

未來變成：

```text
Backend #1
Backend #2
Backend #3
```

每台自己的 Memory 無法天然共享狀態，這時再導入 Redis、Socket.IO Redis Adapter 與 Distributed Lock。

所以 Redis 不是沒用，而是 MVP 暫時不需要承擔這個複雜度。

## 25. Backend 重啟會怎樣？

Memory 裡的 Matching Queue 會消失，因此等待配對者需要回到 IDLE / 重新配對。

但 Room、Session、Message、Connection 等重要資料存在 PostgreSQL，可以恢復。

Server 也可以依 `expiresAt` 重新判斷 Session 是否已經到期。

## 26. 四種測試怎麼分？

**Unit Test**：測一個小零件，例如共同興趣計分、YES + YES 是否建立 Connection。

**Integration Test**：測 NestJS、PostgreSQL、Socket.IO 等多個零件合作。

**E2E Test**：真的模擬 User A 與 User B 從註冊、配對、聊天到建立 Connection。

**Load Test**：大量連線與訊息一起進來，看 Server 是否撐得住。

目前規格的初步 Load Test 情境包含 500 concurrent sockets、100 active rooms、100 人同時 Matching 與 50 msg/s burst。

## 27. 最需要先懂的名詞

| 名詞 | 小白版 |
|---|---|
| Frontend / App | 使用者看到的程式 |
| Backend | 真正執行產品規則的 Server |
| REST API | 一問一答的通訊方式 |
| WebSocket | 持續連線、即時雙向通訊 |
| Socket.IO | FlashTalk 使用的即時通訊工具 |
| PostgreSQL | 主要資料庫 |
| Prisma | Backend 操作資料庫的工具 |
| JWT | 登入身分通行證 |
| Transaction | 全部成功或全部取消 |
| State Machine | 規定狀態可以如何切換 |
| Idempotency | 重送同一要求不重複產生結果 |
| Race Condition | 多個操作同時搶資料造成問題 |
| Lock | 暫時鎖住資源避免同時修改 |
| ACK | Server 確認已成功處理 |
| Redis | 未來多 Backend 時的共享協調層 |

## 28. 一個完整案例

```text
A：音樂、電影
B：音樂、旅行
```

1. A、B 登入，Backend 驗證後發 JWT。
2. A 透過 Socket.IO 送 `matching.join`。
3. B 也加入興趣配對。
4. Server 發現 A、B 有「音樂」這個共同興趣。
5. Server 鎖住兩人並重新檢查資格。
6. 建立 Chat Room 與 10 分鐘 Session #1。
7. Server 對兩端送 `matching.found`。
8. A 傳「你好」，Server 驗證、寫 PostgreSQL、ACK A，再即時送給 B。
9. B 短暫斷線，Timer 繼續；B 回來後 `chat.sync`。
10. 10 分鐘到，Server 將 Session 改為 ENDED。
11. A、B 分別送 Connection Decision。
12. 如果都是 YES，Transaction 建立唯一 Connection。
13. 原 Session #1 訊息保留，兩人繼續聊天。
14. Connection 存續期間，Matching 不會再把兩人互配。

## 29. 哪些產品參數還沒完全決定？

技術規格仍列有 Open Questions，例如：

```text
Email 驗證碼多久過期
Refresh Token TTL
Password Policy
Connection Decision 最長等待時間
一方永遠不回覆 Decision 怎麼辦
Pair Cooldown 實際多久
聊天資料保存多久
Early End 後是否還能 Connection Decision
Socket Disconnect Grace Period
正式 Rate Limit
Avatar 限制
正式上線預估 CCU / DAU
```

這些應由產品規則補充或做成可配置參數，不應由工程師自行猜測。

## 30. 建議學習順序

```text
第一階段
App → Backend → Database
REST vs WebSocket

第二階段
User → Matching → Room → Session → Message → Connection

第三階段
JWT → State Machine → Transaction → Reconnect
→ Idempotency → Race Condition

第四階段
Logging → Metrics → Unit / Integration / E2E / Load Test

第五階段
Redis → Horizontal Scaling → Distributed Lock
```

第五階段目前不是 MVP 必要前置知識。

## 31. 最後只記住五件事

1. **App 不是裁判，Server 才有最終決定權。**
2. **REST 處理一般操作，Socket.IO 處理即時操作。**
3. **PostgreSQL 是重要資料的正式記憶。**
4. **聊天系統真正難的是同時操作、斷線、重送與時間到期，而不只是聊天室 UI。**
5. **MVP 先用 React Native + Expo + NestJS + Socket.IO + PostgreSQL + Prisma + 單 Backend，把核心流程做穩，再考慮 Redis 與水平擴展。**

之後閱讀正式技術規格時，可以一直問四個問題：

```text
這個功能是 App 還是 Backend 負責？
它使用 REST 還是 Socket.IO？
哪些資料需要保存 PostgreSQL？
斷線、重複送出、同時操作時會發生什麼？
```

能回答這四題，就已經開始真正理解 FlashTalk 的系統設計，而不是只背技術名詞。
