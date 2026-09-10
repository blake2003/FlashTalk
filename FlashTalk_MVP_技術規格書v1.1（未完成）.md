# FlashTalk v1 MVP 技術規格書

> **Version：v1.1.0**  
> **產品名稱：FlashTalk**  
> **文件類型：Technical Specification**  
> **對應需求文件：FlashTalk v1.0 MVP PRD v1.0.0**

---

# 一、系統架構

## 1.1 技術架構

| 項目 | 技術 |
|---|---|
| Mobile App | React Native |
| App Framework | Expo |
| Language | TypeScript |
| Navigation | Expo Router |
| HTTP Client | Axios |
| Client State | Zustand |
| Backend | Node.js |
| Backend Framework | Express |
| API | RESTful API |
| 即時通訊 | WebSocket / Socket.IO |
| ORM | Prisma |
| Database | PostgreSQL |
| Authentication | Email OTP + JWT |
| API Documentation | Swagger / OpenAPI |
| Avatar Storage | S3 Compatible Object Storage |
| Email | Email Provider / SMTP |
| Architecture | Modular Monolith |

Mobile
├── React Native + Expo
├── Expo Router
├── Axios
└── Zustand

Backend
├── Node.js + NestJS
└── Socket.IO

Database
├── PostgreSQL
└── Prisma

Auth
├── JWT
└── Email OTP

External
├── Email
└── Avatar Storage

## 1.2 整體架構

```mermaid
flowchart TD

APP[React Native + Expo App]

REST[RESTful API]
WS[WebSocket / Socket.IO]

SERVER[Node.js + NestJS]

DB[(PostgreSQL)]
MAIL[Email Provider]
STORAGE[Object Storage]

APP --> REST
APP --> WS

REST --> SERVER
WS --> SERVER

SERVER --> DB
SERVER --> MAIL
SERVER --> STORAGE
```

---

# 二、專案結構

```text
flashtalk/
│
├── apps/
│   ├── mobile/
│   └── api/
│
├── packages/
│   └── shared/
│
├── package.json
└── pnpm-workspace.yaml
```

## 2.1 Mobile

```text
apps/mobile
```

主要技術：

```text
React Native
Expo
TypeScript
Expo Router
Axios
Zustand
Socket.IO Client
```

## 2.2 API

```text
apps/api
```

主要技術：

```text
Node.js
Express
Prisma
PostgreSQL
Socket.IO
JWT
Swagger
```

## 2.3 Shared

```text
packages/shared
```

共用：

```text
TypeScript Types
Enums
Constants
API Models
WebSocket Event Types
```

---

# 三、Backend Module

```text
AppModule

AuthModule
UserModule
InterestModule

MatchingModule

ChatModule
ChatSessionModule

ConnectionModule

BlockModule
ReportModule

MailModule
StorageModule
```

---

# 四、Authentication

Authentication 採用 **Email 註冊 + 帳號密碼登入** 架構。

登入認證共分為四個流程：

1. 使用者註冊（Register）
2. 使用者登入（Login）
3. Email 驗證（Email Verification）
4. 忘記密碼（Forgot Password）

                Authentication

        ┌────────────┼─────────────┐
        │            │             │
        ▼            ▼             ▼

   Registration     Login      Password Recovery
        │            │             │
Email + Username  Username      Username / Email
+ Password        + Password          │
        │            │                ▼
        ▼            ▼            Email OTP
   Email OTP     Verify Password      │
        │            │                ▼
        ▼            ▼           Reset Token
     ACTIVE          JWT               │
                        	            ▼
                                 New Password

---

## 4.1 Register（使用者註冊）

使用者於註冊時需輸入：

```text
Email
User ID（帳號）
Password
```

註冊完成後建立未啟用帳號，並寄送 Email 驗證碼。

驗證成功後：

```text
Account Status
↓

ACTIVE
```

流程：

```mermaid
flowchart TD

A[Register]
-->B[輸入 Email]

B-->C[輸入 User ID]

C-->D[輸入 Password]

D-->E[POST /auth/register]

E-->F[Validate Request]

F-->G{User ID Exists?}

G--Yes-->H[USER_ID_ALREADY_EXISTS]

G--No-->I{Email Exists?}

I--Yes-->J[EMAIL_ALREADY_EXISTS]

I--No-->K[Hash Password]

K-->L[Create User]

L-->M[status = PENDING_EMAIL_VERIFICATION]

M-->N[Generate Email OTP]

N-->O[Save OTP]

O-->P[Send Verification Email]

P-->Q[等待 Email 驗證]
```

---

## 4.2 Email Verification（Email 驗證）

Email OTP 僅用於驗證 Email 是否為本人持有。

驗證成功後：

```text
status = ACTIVE

email_verified_at = now
```

流程：

```mermaid
flowchart TD

A[User 輸入 OTP]
-->B[POST /auth/register/verify-email]

B-->C[Validate OTP]

C-->D{OTP Valid?}

D--No-->E[Verification Failed]

D--Yes-->F[Email Verified]

F-->G[Account ACTIVE]

G-->H[Registration Completed]

H-->I[導向 Login]
```

重新寄送驗證碼：

```http
POST /api/v1/auth/register/resend-code
```

---

## 4.3 Login（使用者登入）

登入方式：

```text
User ID
+
Password
```

登入成功後發放：

```text
Access Token
Refresh Token
```

流程：

```mermaid
flowchart TD

A[Login]
-->B[輸入 User ID]

B-->C[輸入 Password]

C-->D[POST /auth/login]

D-->E[Find User]

E-->F{User Exists?}

F--No-->G[AUTH_INVALID_CREDENTIALS]

F--Yes-->H{Email Verified?}

H--No-->I[EMAIL_NOT_VERIFIED]

H--Yes-->J[Compare Password Hash]

J-->K{Password Correct?}

K--No-->G

K--Yes-->L{Account ACTIVE?}

L--No-->M[ACCOUNT_DISABLED]

L--Yes-->N[Generate JWT]

N-->O[Generate Refresh Token]

O-->P[Save Refresh Token]

P-->Q[Login Success]
```

JWT：

```text
Access Token
Refresh Token
```

API：

```http
Authorization: Bearer <access_token>
```

WebSocket：

```text
JWT
↓

Socket Authentication

↓

User Identity
```

---

## 4.4 Forgot Password（忘記密碼）

忘記密碼流程使用 Email OTP 驗證。

流程：

```mermaid
flowchart TD

A[Forgot Password]
-->B[輸入 User ID 或 Email]

B-->C[POST /auth/password/forgot]

C-->D[Find User]

D-->E{User Exists?}

E--No-->F[Return Generic Message]

E--Yes-->G[Generate OTP]

G-->H[Save OTP]

H-->I[Send Email]

I-->J[User 輸入 OTP]

J-->K[POST /auth/password/verify-code]

K-->L{OTP Valid?}

L--No-->M[Verification Failed]

L--Yes-->N[Generate Password Reset Token]

N-->O[設定新密碼]

O-->P[POST /auth/password/reset]

P-->Q[Hash Password]

Q-->R[Update Password]

R-->S[Revoke Refresh Tokens]

S-->T[Password Reset Completed]
```

---

## 4.5 JWT Authentication

Authentication 採用 JWT Bearer Token。

Token：

```text
Access Token
Refresh Token
```

用途：

| Token | 用途 |
|--------|------|
| Access Token | REST API、WebSocket Authentication |
| Refresh Token | 重新取得 Access Token |

流程：

```mermaid
sequenceDiagram

participant App
participant API

App->>API: Login

API-->>App: Access Token + Refresh Token

App->>API: REST API (Bearer Token)

API-->>App: Response

App->>API: WebSocket Connect

API->>API: Verify JWT

API-->>App: Socket Connected
```
Username + Password
        │
        ▼
      Login
        │
        ▼
       JWT
        │
   ┌────┴─────┐
   ▼          ▼
REST API   WebSocket
   │          │
   └────┬─────┘
        ▼
Server 知道「你是誰」
---

## 4.6 Authentication API

### Register

```http
POST /api/v1/auth/register
POST /api/v1/auth/register/verify-email
POST /api/v1/auth/register/resend-code
```

### Login

```http
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### Forgot Password

```http
POST /api/v1/auth/password/forgot
POST /api/v1/auth/password/verify-code
POST /api/v1/auth/password/reset
```

---

## 4.7 User Authentication Fields

```text
id
user_id
email
password_hash
email_verified_at
status
created_at
updated_at
```

Account Status：

```text
PENDING_EMAIL_VERIFICATION
ACTIVE
SUSPENDED
DELETED
```

---

## 4.8 Authentication State Flow

```mermaid
stateDiagram-v2

[*] --> REGISTER

REGISTER --> EMAIL_VERIFICATION

EMAIL_VERIFICATION --> ACTIVE

ACTIVE --> LOGIN

LOGIN --> AUTHENTICATED

AUTHENTICATED --> REFRESH_TOKEN

REFRESH_TOKEN --> AUTHENTICATED

AUTHENTICATED --> LOGOUT

LOGOUT --> [*]

ACTIVE --> FORGOT_PASSWORD

FORGOT_PASSWORD --> EMAIL_VERIFICATION

EMAIL_VERIFICATION --> PASSWORD_RESET

PASSWORD_RESET --> LOGIN
```  

# 五、User Profile

## 5.1 User

```text
users
```

欄位：

```text
id
username
email
password_hash
email_verified_at

nickname
avatar_url
status

created_at
updated_at
```

建議：

```text
id: UUID
username: UNIQUE
email: UNIQUE
```

Status：

```text
PENDING_VERIFICATION
ACTIVE
SUSPENDED
DELETED
```

---

# 六、Interest 興趣

```text
interests
```

欄位：

```text
id
name
enabled
sort
created_at
updated_at
```

User 與 Interest：

```text
user_interests
<!-- 建立中間table -->

user_id
interest_id

users
      \
       user_interests
      /
interests
```

使用者可選擇：

```text
1～3 個官方 Interest
```

流程：
```
flowchart TD

A[App 選擇 Interest]
-->B[送出 interestIds]

B-->C{數量是否 1～3?}

C--否-->D[Reject]

C--是-->E[查詢 Interests]

E-->F{全部存在且 enabled?}

F--否-->D

F--是-->G[更新 user_interests]

G-->H[完成]
```

---

# 七、Matching

配對模式：

```text
RANDOM
INTEREST
```

Matching Queue：

```text
Node.js Memory
```

Server Restart 後由 App WebSocket reconnect 並重新加入 Queue。

---

# 八、Random Matching

流程：

```mermaid
flowchart TD

A[User Join Random Matching]
-->B[Validate User State]

B-->C{User Can Join Matching?}

C--No-->D[Reject matching.join]

C--Yes-->E[Get Users From Random Queue]

E-->F[Filter Invalid Candidates]

F-->G{Valid Candidate Exists?}

G--No-->H[Add User To Random Queue]

H-->I[Set User State = MATCHING]

I-->J[Send matching.waiting]

J-->K[Wait For Match / Cancel / Disconnect]

G--Yes-->L[Randomly Select One Candidate]

L-->M[Revalidate Both Users]

M-->N{Both Users Still Valid?}

N--No-->E

N--Yes-->O[Remove Both Users From Queue]

O-->P[Set Both Users State = CHATTING]

P-->Q[Create Chat Room]

Q-->R[Create Session 1]

R-->S[Join Both Sockets To Chat Room]

S-->T[Send matching.found]

T-->U[Both Users Enter Chat Room]
```

排除：

```text
Self
Blocked User
User Already Chatting
```

---