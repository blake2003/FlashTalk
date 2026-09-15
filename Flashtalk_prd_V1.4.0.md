# FlashTalk v1.4.0 MVP 產品需求規格書（PRD）

> **Version：v1.4.0**  
> **產品名稱：FlashTalk**

---

## 一、產品定位（Product Positioning）

FlashTalk 是一款以 **1 對 1 即時陌生人配對與限時聊天**為核心的社交平台。

核心理念為：

> **「聊得來才留下，聊不來就自然結束。」**

FlashTalk 希望降低與陌生人開始交流時的心理負擔，讓使用者不需要先建立好友關係，也不需要承擔長期維持社交關係的壓力，即可快速開始一段即時對話。

產品透過：

- 即時陌生人配對
- 興趣配對
- 1 對 1 私密聊天
- 15 分鐘限時交流
- 雙向選擇
- Connection 機制

建立一個以「對話本身」作為認識彼此主要方式的陌生人社交體驗。

### 核心產品概念

FlashTalk 的社交流程遵循：

> **先聊天，再決定是否繼續認識彼此。**

使用者配對成功後，不會立即建立長期社交關係，而是先進入 **15 分鐘限時聊天**。

第一次聊天結束後，只有雙方都願意繼續交流，才會進入第二次聊天。

第二次聊天結束後，只有雙方都願意建立聯繫，系統才會建立 Connection。

整體關係建立流程為：

```text
陌生人
    │
    ▼
即時配對
    │
    ▼
第一次 15 分鐘聊天
    │
    ▼
雙方決定是否繼續
    │
    ▼
第二次 15 分鐘聊天
    │
    ▼
雙方決定是否建立 Connection
    │
    ▼
建立長期聯繫
```

透過階段式的雙向選擇，讓使用者可以自然決定：

- 要不要開始聊天
- 要不要繼續聊天
- 要不要建立長期聯繫

任一階段只要其中一方沒有繼續交流的意願，雙方關係即可自然結束。

### 產品核心價值

#### 1. 降低陌生人社交門檻

使用者不需要先建立好友關係，即可透過配對開始聊天。

降低「主動搭訕」以及「不知道如何開始認識陌生人」所產生的心理壓力。

#### 2. 讓對話成為認識彼此的主要方式

FlashTalk 將實際聊天體驗放在關係建立之前。

使用者先透過對話了解彼此，再決定是否值得繼續交流。

#### 3. 限時交流降低社交壓力

每次聊天具有明確的時間範圍。

使用者不需要承擔「開始聊天後不知道什麼時候可以結束」的社交壓力。

聊天時間結束後，由系統提供自然的關係選擇節點。

#### 4. 雙向同意才建立關係

無論是繼續聊天或建立 Connection，都必須建立在雙方共同意願之上。

避免單方面要求對方持續交流，降低陌生人社交過程中的心理負擔。

### 產品定位原則

FlashTalk 定位為：

> **陌生人即時社交與聊天平台。**

平台核心目的為促進陌生人之間的即時交流與自然社交。

使用者可能透過 FlashTalk：

- 認識新朋友
- 分享生活
- 交流共同興趣
- 找人聊天
- 打發時間
- 建立新的社交關係

FlashTalk MVP 不以戀愛、約會或特定性別配對作為主要產品定位。

同時，FlashTalk 不以傳統社交平台常見的：

- 公開動態
- 貼文
- 追蹤
- 粉絲
- 社群內容經營

作為 MVP 的核心體驗。

產品初期專注於：

> **配對 → 聊天 → 雙向選擇 → Connection**

建立清楚且低負擔的陌生人社交流程。

---

## 二、產品目標（Product Goals）

FlashTalk 的主要產品目標，是建立一個 **快速、低負擔、安全且具有自然關係篩選機制的陌生人聊天體驗**。

產品目標分為：

1. 配對體驗
2. 聊天體驗
3. 社交關係建立
4. 使用者安全
5. 產品驗證

### 1. 配對體驗目標

讓使用者能以簡單且低操作成本的方式開始與陌生人交流。

使用者可依照當下需求選擇：

- 興趣配對
- 全隨機配對

降低開始陌生人聊天前所需要進行的操作。

產品應盡可能提高：

> **有效配對與有效聊天的發生率。**

而非單純追求配對數量。

---

### 2. 聊天體驗目標

透過 **15 分鐘限時聊天**建立具有明確開始與結束節點的交流體驗。

降低以下陌生人聊天常見問題：

- 不知道如何結束對話
- 對話拖延造成心理負擔
- 因為沒有明確結束點而產生尷尬
- 一開始就需要承擔長期社交關係壓力

FlashTalk 希望讓每一次聊天都成為一段相對獨立且低負擔的交流。

---

### 3. 社交關係建立目標

FlashTalk 不要求使用者在第一次配對時，就決定是否與對方建立長期聯繫。

關係建立採用階段式流程：

```text
配對
 ↓
第一次聊天
 ↓
是否繼續聊天
 ↓
第二次聊天
 ↓
是否建立 Connection
```

第一次聊天後：

> **雙方皆同意，才繼續第二次聊天。**

第二次聊天後：

> **雙方皆同意，才建立 Connection。**

透過雙向選擇機制降低無效社交關係，讓 Connection 代表雙方確實具有繼續交流的意願。

---

### 4. 使用者安全目標

陌生人聊天具有騷擾、垃圾訊息、詐騙及不當內容等潛在風險。

FlashTalk 在 MVP 階段即將安全機制作為核心產品需求之一。

平台透過：

- 限制訊息類型
- Match Cooldown
- Report
- Blacklist
- 帳號停權
- 聊天紀錄安全緩衝
- 後台安全審查

降低陌生人聊天可能產生的安全風險。

安全機制的核心原則為：

> **在不過度增加正常使用者操作負擔的前提下，降低惡意使用者對平台造成的影響。**

---

### 5. 產品驗證目標

FlashTalk MVP 的主要目的不是一次建立完整的大型社交平台，而是驗證核心陌生人聊天模式是否具有持續使用價值。

MVP 優先驗證：

- 使用者是否願意進行陌生人即時配對
- 使用者是否願意完成第一次 15 分鐘聊天
- 第一次聊天後是否願意繼續第二次聊天
- 第二次聊天後是否願意建立 Connection
- 興趣配對是否能提高有效聊天意願
- 限時聊天是否能降低陌生人聊天的心理負擔
- 雙向選擇是否能提高 Connection 的有效性
- 安全機制是否足以支撐基本陌生人社交環境

MVP 的核心驗證流程為：

```text
進入平台
    ↓
開始配對
    ↓
成功配對
    ↓
第一次聊天
    ↓
繼續聊天
    ↓
第二次聊天
    ↓
建立 Connection
```

後續可依實際使用數據評估產品方向與功能擴充。

---

## 三、目標族群（Target Users）

FlashTalk 的主要使用者，是希望與陌生人進行即時交流，但不希望在一開始就承擔較高社交壓力或長期關係負擔的使用者。

### 核心使用者

主要包含：

- 想認識陌生人的使用者
- 想認識新朋友的使用者
- 想找人即時聊天的使用者
- 想分享生活或當下心情的使用者
- 想與具有共同興趣的人交流的使用者
- 想透過聊天打發時間的使用者
- 不希望一開始就建立長期社交關係的使用者
- 偏好先透過對話，再決定是否繼續認識對方的使用者

---

### 主要使用情境（Use Cases）

#### 情境一：單純想找人聊天

使用者目前有聊天需求，希望快速找到另一位同樣想聊天的人。

```text
想找人聊天
    ↓
選擇配對方式
    ↓
找到陌生人
    ↓
開始 15 分鐘聊天
```

---

#### 情境二：尋找共同興趣的聊天對象

使用者希望與具有相同興趣的人交流。

例如：

- 音樂
- 電影
- 遊戲
- 動漫
- 運動
- 旅行
- 美食

使用者可透過興趣配對尋找具有共同興趣標籤的聊天對象。

---

#### 情境三：分享生活

使用者可能只是希望有人可以：

- 聽自己分享今天發生的事情
- 聊最近的生活
- 分享興趣
- 討論某個話題

不一定以建立長期關係為目的。

---

#### 情境四：打發時間

使用者在：

- 通勤
- 等待
- 休息
- 無聊

等情境下，希望快速找到陌生人進行短時間交流。

15 分鐘聊天機制讓這類使用情境具有明確且容易理解的時間範圍。

---

#### 情境五：認識可能繼續聯絡的人

使用者可能在第一次聊天後發現彼此聊得來。

雙方可以選擇繼續第二次聊天。

若第二次聊天後仍希望保持聯繫，則可透過雙向同意建立 Connection。

因此使用者不需要在配對成功的第一時間決定：

> 「我要不要跟這個人成為朋友？」

而是可以透過實際聊天逐步決定是否建立後續關係。

---

### 使用者共同特徵

FlashTalk 的核心使用者不一定具有特定職業、興趣或社交目的，但通常具有以下其中一項需求：

> **「我現在想找一個人聊聊。」**

或：

> **「我想認識新的人，但希望先聊過再決定要不要繼續認識。」**

因此 FlashTalk 的核心不是讓使用者建立大量社交關係，而是：

> **讓陌生人之間更容易開始一段對話，並讓值得繼續的關係自然留下。**

---

## 四、登入系統（Authentication）

FlashTalk 採用 Email 註冊，並以 **Email + Password** 作為登入方式。

使用者完成註冊後，系統即建立正式帳號，但在完成 Email 驗證前，帳號維持於 **待驗證（PENDING_VERIFICATION）** 狀態。

完成 Email 驗證後，帳號才轉為 **ACTIVE**，並取得 FlashTalk 完整使用權限。

### 註冊流程

1. 使用者輸入 Email 與 Password 進行註冊。
2. 系統檢查 Email 是否已被註冊。
3. 註冊成功後立即建立使用者帳號。
4. 新建立帳號狀態設定為 **PENDING_VERIFICATION**。
5. 系統發送 Email 驗證碼至使用者註冊信箱。
6. 使用者輸入 Email 驗證碼。
7. 驗證成功後，帳號狀態由 **PENDING_VERIFICATION** 轉為 **ACTIVE**。
8. 使用者取得完整平台使用權限。

```text
輸入 Email + Password
        │
        ▼
      註冊
        │
        ▼
    建立使用者帳號
        │
        ▼
PENDING_VERIFICATION
        │
        ▼
  發送 Email 驗證碼
        │
        ▼
   使用者輸入驗證碼
        │
        ▼
     驗證成功
        │
        ▼
      ACTIVE
        │
        ▼
  可使用完整平台功能
```

### 登入規則

- 使用 **Email + Password** 登入。
- Email 為登入帳號，必須具有唯一性。
- User ID 為系統內部唯一識別碼，不作為登入帳號。
- 僅 **ACTIVE** 狀態帳號可正常使用配對與聊天功能。
- **PENDING_VERIFICATION** 帳號登入後，應引導使用者完成 Email 驗證。
- **SUSPENDED、BANNED、DELETED** 帳號依帳號狀態限制登入或平台功能。

### Email 驗證

系統提供：

- Email 驗證碼發送
- Email 驗證碼輸入
- Email 驗證碼驗證
- 重新發送驗證碼

驗證成功後：

```text
PENDING_VERIFICATION
        │
        ▼
      ACTIVE
```

Email 驗證碼的：

- 有效期限
- 重新發送間隔
- 最大驗證次數
- 每日發送上限

於後續 Authentication 技術規格統一定義，避免在產品 PRD 中綁定過早的技術限制。

### 密碼功能

支援：

- Password 登入
- 忘記密碼
- 密碼重設

密碼加密方式、Password Policy、登入失敗限制與 Token 機制於後續安全與 Authentication 技術規格中定義。

---

## 五、使用者資料（User Profile）

每位使用者完成註冊並建立帳號後，系統會建立對應的使用者資料。

FlashTalk 將使用者資料區分為：

1. **帳號基本資料（Account Data）**
2. **使用者公開資料（Profile Data）**
3. **帳號狀態（Account Status）**

帳號基本資料由系統管理；使用者公開資料則依平台規則允許使用者自行修改。

### 帳號基本資料

| 欄位 | 說明 |
| --- | --- |
| User ID | 系統內部唯一識別碼，不可重複，不作為登入帳號 |
| Email | 使用者登入帳號，必須唯一 |
| Email 驗證狀態 | 紀錄 Email 是否完成驗證 |
| 帳號狀態 | 使用者目前帳號生命週期狀態 |
| 建立時間 | 帳號建立時間 |
| 最後活動時間 | 使用者最後一次有效活動時間 |

---

### 使用者公開資料

| 欄位 | 說明 |
| --- | --- |
| 暱稱 | 使用者顯示名稱，可自行修改 |
| 頭像 | 使用者上傳的個人頭像 |
| 興趣標籤 | 配對依據，可選擇官方提供的興趣標籤 |

上述 Profile Data 可於配對或聊天流程中依產品 UI/UX 規則顯示給其他使用者。

Email、帳號狀態等 Account Data 屬於非公開資料，不提供其他一般使用者查看。

---

### 帳號狀態（Account Status）

帳號至少包含以下狀態：

| 狀態 | 說明 |
| --- | --- |
| PENDING_VERIFICATION | 已完成註冊並建立帳號，但尚未完成 Email 驗證 |
| ACTIVE | 已完成 Email 驗證，可正常使用平台功能 |
| SUSPENDED | 帳號暫時停權，期間不可正常使用配對與聊天功能 |
| BANNED | 帳號因重大或持續違規遭永久停權 |
| DELETED | 使用者已申請刪除帳號，停止提供一般平台功能 |

---

### 帳號生命週期

主要帳號狀態流程：

```text
完成註冊
    │
    ▼
PENDING_VERIFICATION
    │
    │ Email 驗證成功
    ▼
ACTIVE
    │
    ├── 違規暫時停權 ──► SUSPENDED
    │                       │
    │                       └── 停權解除 ──► ACTIVE
    │
    ├── 重大／持續違規 ──► BANNED
    │
    └── 使用者刪除帳號 ──► DELETED
```

#### PENDING_VERIFICATION

代表：

- 帳號已經建立。
- Email 尚未完成驗證。
- 可進行 Email 驗證相關操作。
- 不可進入配對系統。
- 不可建立聊天室。

#### ACTIVE

代表：

- Email 已完成驗證。
- 帳號正常。
- 可使用 FlashTalk 一般功能。
- 可進入配對系統。
- 可進入聊天室。
- 可建立 Connection。

#### SUSPENDED

代表帳號目前受到暫時性限制。

停權期間：

- 不可進入配對系統。
- 不可建立新的聊天室。
- 其他功能權限依後續安全政策定義。

停權解除後，可重新轉為 **ACTIVE**。

#### BANNED

代表帳號因重大違規或持續違反平台規範遭永久停權。

BANNED 帳號：

- 不可進行配對。
- 不可建立聊天室。
- 不可繼續使用一般平台功能。

實際處置方式由後續 Safety / Moderation 規格統一定義。

#### DELETED

代表使用者已主動申請刪除帳號。

進入 **DELETED** 狀態後：

- 不可繼續進行配對。
- 不可建立聊天室。
- 不可建立新的 Connection。
- 停止提供一般平台功能。

---

### 帳號刪除

使用者可主動申請刪除自己的帳號。

帳號刪除後：

- 帳號狀態轉為 **DELETED**。
- 停止提供一般平台功能。
- 不再參與任何新的配對。

與以下項目相關的資料不因帳號刪除立即移除：

- 檢舉案件
- 安全審查
- 違規紀錄
- 平台依法或依安全政策需要保留的資料

一般個人資料、聊天資料及其他使用者資料的實際刪除時程，於後續 **Data Retention（資料保存政策）** 中統一定義。

---

## 六、配對系統（Matching）

FlashTalk 提供兩種配對模式：

1. **興趣配對**
2. **全隨機配對**

使用者進入配對流程前，可自行選擇本次希望使用的配對方式。

---

### 1. 興趣配對（Interest Matching）

使用者可選擇 **1～3 個官方興趣標籤**進行興趣配對。

#### 配對條件

進行興趣配對時，系統只會將至少擁有 **1 個共同興趣標籤**的使用者進行配對。

例如：

使用者 A 選擇：

- 音樂
- 電影
- 遊戲

使用者 B 選擇：

- 音樂
- 旅行

A 與 B 共同擁有「音樂」標籤，因此雙方符合興趣配對條件。

若雙方沒有任何共同興趣標籤，則不符合興趣配對條件。

---

#### 配對優先順序

若同時存在多位符合興趣配對條件的使用者，系統依照 **共同興趣標籤數量**決定配對優先順序。

共同興趣標籤數量越多，配對優先級越高。

例如使用者 A 選擇：

- 音樂
- 電影
- 遊戲

其他使用者：

| 使用者 | 興趣標籤 | 與 A 共同標籤數 | 配對優先級 |
| --- | --- | ---: | --- |
| B | 音樂、電影、遊戲 | 3 | 第一優先 |
| C | 音樂、電影、旅行 | 2 | 第二優先 |
| D | 音樂、運動、旅行 | 1 | 第三優先 |
| E | 美食、運動、旅行 | 0 | 不符合配對條件 |

配對優先順序**完全以共同興趣標籤數量為主要判斷條件**。

等待時間不會提高或降低使用者的配對優先級。

---

#### 相同優先級處理

若同時有多位使用者具有相同數量的共同興趣標籤，系統將從這些使用者中進行 **隨機選擇**。

例如：

使用者 A 與：

- 使用者 B：共同 2 個興趣標籤
- 使用者 C：共同 2 個興趣標籤
- 使用者 D：共同 1 個興趣標籤

系統會優先從 B 與 C 之間進行隨機選擇。

D 因共同興趣標籤數較少，因此優先級低於 B 與 C。

---

#### 等待規則

興趣配對 **不設定 Timeout**。

使用者進入興趣配對後：

- 系統持續尋找符合興趣條件的使用者。
- 不因等待時間增加而改變配對優先級。
- 不因等待時間增加而降低共同興趣標籤條件。
- 不會自動切換為全隨機配對。
- 使用者可自行取消本次配對。

---

### 2. 全隨機配對（Random Matching）

全隨機配對不考慮使用者的興趣標籤。

使用者選擇全隨機配對後，系統將直接尋找目前同樣進行全隨機配對且符合平台基本配對條件的其他使用者。

符合條件後進行隨機配對。

興趣標籤不影響全隨機配對的優先順序。

---

### 3. 基本配對限制

無論使用興趣配對或全隨機配對，系統皆不得將使用者與以下對象進行配對：

- 使用者本人
- 非 **ACTIVE** 狀態帳號
- 已經進入其他聊天室的使用者
- 已存在有效黑名單限制的使用者
- 仍處於 Match Cooldown 的使用者

同一位使用者同一時間只能進行 **一個配對流程**。

當使用者已成功配對後，該次配對流程立即結束，並進入 1 對 1 聊天流程。

---

### 4. 配對取消

使用者在尚未成功配對前，可主動取消配對。

取消後：

- 系統停止為該使用者尋找配對對象。
- 使用者回到配對模式選擇畫面。
- 使用者可重新選擇興趣配對或全隨機配對。
- 取消配對不建立 Match Cooldown。

若系統已完成雙方配對並建立聊天室，則不再視為「取消配對」，後續行為依聊天室離開規則處理。

---

## 七、聊天室（Chat Room）

配對成功後，系統將為雙方建立一個 **1 對 1 即時聊天室**。

聊天室為 FlashTalk 陌生人交流的主要空間，使用者可在限定的聊天時間內與配對對象進行即時文字交流。

聊天室採用即時通訊機制，確保雙方可以即時接收與傳送訊息。

---

### 1. 聊天室建立

當配對系統確認雙方成功配對後，系統建立本次 1 對 1 聊天室，並將雙方加入聊天室。

基本規則：

- 每個聊天室僅包含兩位使用者。
- 使用者同一時間只能存在於一個進行中的陌生人聊天室。
- 聊天室建立後，雙方進入聊天流程。
- 聊天時間與 Chat Session 規則由第八章統一定義。
- 聊天室結束後，不可繼續於該次 Chat Session 傳送新訊息。

基本流程：

```text
配對成功
    │
    ▼
建立 1 對 1 聊天室
    │
    ▼
雙方進入聊天室
    │
    ▼
建立 Chat Session
    │
    ▼
開始即時聊天
```

---

### 2. 聊天室使用者資料

聊天室內可顯示對方的公開 Profile Data。

包含：

- 頭像
- 暱稱
- 興趣標籤

Email、User ID、帳號狀態及其他 Account Data 不對聊天對象公開。

#### 興趣配對

若雙方透過興趣配對進入聊天室，可優先呈現雙方的 **共同興趣標籤**。

例如：

```text
共同興趣

🎵 音樂
🎮 遊戲
🎬 電影
```

共同興趣可作為雙方開始聊天時的破冰資訊。

#### 全隨機配對

若雙方透過全隨機配對進入聊天室，可顯示對方設定的公開興趣標籤。

興趣標籤僅作為聊天參考資訊，不影響已完成的全隨機配對結果。

---

### 3. 訊息功能（Messaging）

FlashTalk MVP 以即時文字交流為主要聊天方式。

#### 支援內容

聊天室支援：

- 文字訊息
- Emoji
- 回覆訊息（Reply）

#### 回覆訊息（Reply）

使用者可以針對聊天室中的特定訊息進行回覆。

回覆訊息應保留被回覆訊息的基本內容，使雙方能辨識目前回覆所對應的上下文。

例如：

```text
A：
最近有推薦的電影嗎？

B 回覆：
┌ 最近有推薦的電影嗎？
│
└ 我最近看了一部科幻片，還不錯。
```

回覆功能僅用於建立訊息之間的上下文關聯，不建立獨立討論串（Thread）。

---

### 4. 不支援的訊息功能

FlashTalk MVP 不提供以下訊息類型：

- 圖片
- 影片
- 檔案
- 語音訊息
- 外部連結

同時不提供以下訊息操作：

- 複製訊息
- 刪除訊息
- 收回訊息
- 編輯已送出的訊息

訊息送出後即視為正式聊天內容，不允許使用者自行修改或移除。

單則訊息的最大內容長度、傳送頻率限制及其他 Messaging 技術限制，於後續技術規格中統一定義。

---

### 5. 訊息狀態

FlashTalk 提供基本訊息傳送狀態，讓使用者確認訊息是否成功送達聊天系統。

基本狀態包含：

```text
輸入訊息
    │
    ▼
傳送
    │
    ▼
Sending
    │
    ▼
伺服器接收
    │
    ▼
Sent
```

若訊息傳送失敗，系統應提供對應的失敗狀態，避免使用者誤認訊息已成功送出。

具體訊息確認、重新傳送及可靠性機制於後續 WebSocket / Messaging 技術規格中定義。

---

### 6. 不提供已讀狀態

FlashTalk MVP **不提供訊息已讀（Read Receipt）功能**。

使用者無法確認對方是否已讀取特定訊息。

設計目的：

- 降低陌生人聊天的回覆壓力。
- 避免「已讀未回」造成額外社交負擔。
- 維持 FlashTalk 低壓力陌生人聊天的產品定位。

---

### 7. 正在輸入（Typing Indicator）

當其中一位使用者正在輸入訊息時，可向另一位使用者顯示：

> **對方正在輸入⋯**

Typing Indicator 僅代表對方目前正在進行訊息輸入操作，不代表訊息一定會被送出。

具體觸發頻率、Timeout 與 WebSocket Event 行為於後續技術規格中定義。

---

### 8. 主動離開聊天室

使用者在聊天進行期間可隨時主動離開聊天室。

不要求使用者一定完成完整的 15 分鐘聊天。

若任一方主動離開：

```text
聊天進行中
    │
    ▼
其中一方主動離開
    │
    ▼
結束目前 Chat Session
    │
    ▼
另一方收到聊天已結束狀態
    │
    ▼
聊天室停止接受新訊息
```

一方主動離開後，另一方不需要繼續停留於聊天室等待。

主動離開代表該次聊天提前結束。

因此，若使用者於第一次 Chat Session 中主動離開，視為該使用者沒有繼續本次交流的意願，不進入「再聊 15 分鐘」的雙向選擇流程。

---

### 9. 網路中斷與重新連線

使用者在聊天期間可能因行動網路切換、Wi-Fi 不穩定或其他網路因素發生暫時性斷線。

FlashTalk 應允許短暫斷線的使用者重新連線至原聊天室。

基本流程：

```text
聊天進行中
    │
    ▼
網路暫時中斷
    │
    ▼
使用者進入暫時離線狀態
    │
    ▼
嘗試重新連線
    │
    ├── 重連成功 ──► 返回原聊天室
    │
    └── 無法重連 ──► 依 Chat Session 結束規則處理
```

暫時性網路中斷 **不立即視為使用者主動離開聊天室**。

---

### 10. 斷線期間聊天時間

網路中斷期間，Chat Session 的聊天時間 **不暫停、不重新計算、不延長**。

例如：

```text
Chat Session 開始
        │
        │ 5 分鐘
        ▼
使用者暫時斷線
        │
        │ Chat Session 持續計時
        ▼
使用者重新連線
        │
        ▼
返回原聊天室
```

重新連線後，使用者只能使用該 Chat Session 原本剩餘的聊天時間。

此規則避免透過主動斷線方式延長聊天時間。

允許重新連線的時間範圍、重連次數及斷線狀態管理，由後續 Chat Session / WebSocket 技術規格統一定義。

---

### 11. 聊天室結束條件

聊天室可能因以下情況停止目前 Chat Session：

1. Chat Session 時間結束。
2. 任一方主動離開聊天室。
3. 任一方進行檢舉並離開。
4. 使用者長時間斷線並超過系統允許的重新連線範圍。
5. 帳號因安全機制或平台管理行為失去聊天權限。
6. 系統因異常或安全原因強制終止聊天室。

其中：

- 正常時間結束後的後續流程，由第九章「聊天結束（Session End）」定義。
- 檢舉、違規及安全處理，由第十一章「安全機制（Safety）」定義。
- Chat Session 時間與生命週期，由第八章「聊天時間（Chat Session）」定義。

---

## 八、聊天時間（Chat Session）

FlashTalk 採用 **限時聊天（Timed Chat）** 作為核心聊天機制。

每次 Chat Session 固定為 **15 分鐘**。

Chat Session 代表聊天室中的一次限時聊天階段，不等同於 Chat Room 本身。

一個 Chat Room 最多包含：

1. 第一次聊天：Session #1
2. 第二次聊天：Session #2

基本流程：

```text
建立 Chat Room
      │
      ▼
Session #1
15 分鐘
      │
      ▼
第一次聊天結束
      │
      ▼
雙方決定是否繼續
      │
      ├── 雙方同意
      │       │
      │       ▼
      │   Session #2
      │    15 分鐘
      │       │
      │       ▼
      │   Connection 決策
      │
      └── 未達成雙方同意
              │
              ▼
          結束聊天
```

---

### 1. Chat Session 時間

每個 Chat Session 固定為：

> **15 分鐘**

Chat Session 開始後即開始計時。

Session 時間不因以下情況暫停：

- App 切換至背景
- 手機鎖定
- 暫時離開 App
- Wi-Fi / 行動網路切換
- 暫時性網路中斷
- WebSocket 暫時斷線
- 使用者重新連線聊天室

只要目前 Chat Session 尚未結束，其時間即持續計算。

---

### 2. 剩餘時間顯示

聊天室應持續顯示目前 Chat Session 的 **剩餘聊天時間**。

例如：

```text
14:32

08:17

03:45

00:32

00:00
```

剩餘時間應以低干擾方式顯示於聊天室介面中。

使用者可以隨時確認目前剩餘聊天時間。

---

### 3. 不提供主動倒數提醒

FlashTalk 不提供額外的主動倒數提醒。

例如不提供：

- 剩餘 10 分鐘提醒
- 剩餘 5 分鐘提醒
- 剩餘 1 分鐘提醒
- 即將結束通知
- 倒數提示 Modal
- 倒數震動
- 倒數音效
- 系統倒數訊息

聊天室僅持續顯示剩餘時間，不額外中斷使用者的聊天體驗。

設計目的：

- 降低時間壓迫感。
- 避免提醒中斷正在進行的對話。
- 維持 FlashTalk 低負擔聊天體驗。
- 同時讓使用者可以自行掌握剩餘聊天時間。

---

### 4. Chat Session 時間基準

Chat Session 的實際開始與結束時間以 **Server 所管理的 Session 狀態為準**。

Client 顯示的倒數時間僅作為使用者介面呈現，不作為實際判斷 Session 是否結束的唯一依據。

概念上：

```text
Session Start
     │
     ▼
Server 建立 Session
     │
     ├── startedAt
     │
     └── expiresAt
             │
             ▼
      Client 顯示剩餘時間
             │
             ▼
         expiresAt
             │
             ▼
        Session End
```

此原則確保不同裝置、網路狀態及重新連線情況下，雙方仍使用相同的 Chat Session 時間基準。

具體時間同步與實作方式於後續 Chat Session 技術規格中定義。

---

### 5. App Background 與鎖定畫面

Chat Session 開始後，若使用者：

- 將 App 切換至背景
- 切換至其他 App
- 鎖定手機
- 暫時離開 FlashTalk

Chat Session 仍然持續計時。

例如：

```text
00:00
Session 開始
    │
    │ 5 分鐘
    ▼
05:00
App 進入背景
    │
    │ Session 持續計時
    ▼
10:00
使用者返回 App
    │
    ▼
剩餘約 5 分鐘
```

App Background 不等同於主動離開聊天室。

---

### 6. 網路中斷與重新連線

聊天期間若使用者發生暫時性網路中斷，Chat Session 不立即結束。

系統允許使用者依第七章定義的重新連線機制返回原聊天室。

重新連線期間：

> **Chat Session 持續計時。**

例如：

```text
Session #1
剩餘 10:00
    │
    ▼
網路中斷
    │
    │ Session 持續計時
    ▼
重新連線
    │
    ▼
Session #1
剩餘 08:20
```

重新連線不會：

- 重新開始 15 分鐘
- 暫停 Session
- 延長 Session
- 補回斷線期間的聊天時間

---

### 7. Chat Session 到期

當剩餘時間到達：

```text
00:00
```

目前 Chat Session 即視為結束。

系統應：

1. 將目前 Chat Session 標記為結束。
2. 停止接受新的聊天訊息。
3. 停用聊天室訊息輸入功能。
4. 向雙方顯示本次聊天已結束。
5. 依目前 Session 階段進入對應的下一步流程。

時間到期代表：

> **目前 Chat Session 結束。**

不代表 Chat Room 必然立即銷毀。

---

### 8. Session 到期時的訊息處理

Chat Session 是否仍允許傳送訊息，以 Server 接收到訊息時的 Session 狀態為準。

若 Server 接收到訊息時 Chat Session 仍為有效狀態：

```text
Session = ACTIVE
        │
        ▼
接受訊息
```

若 Server 接收到訊息時 Chat Session 已經到期：

```text
Session = ENDED
        │
        ▼
拒絕訊息
```

因此，即使使用者在倒數最後一刻按下傳送，如果 Server 接收到訊息時 Session 已經結束，該訊息仍不會進入聊天室。

具體訊息 ACK、時間同步、Race Condition 與 Atomic State Transition 等處理方式於後續技術規格中定義。

---

### 9. 第一次 Chat Session

配對成功並建立 Chat Room 後，系統建立：

> **Session #1**

Session #1 固定為 **15 分鐘**。

Session #1 正常時間結束後：

```text
Session #1
15 分鐘
    │
    ▼
Session End
    │
    ▼
停止傳送新訊息
    │
    ▼
進入續聊決策階段
```

系統詢問雙方是否願意：

> **再聊 15 分鐘？**

雙方分別進行選擇。

---

### 10. 續聊決策

Session #1 正常結束後，雙方可選擇：

- 再聊 15 分鐘
- 結束聊天

雙方的選擇採用 **獨立且不可互相查看的決策機制**。

在對方完成選擇之前，不顯示：

- 對方選擇了什麼
- 對方是否選擇繼續
- 對方是否選擇結束

例如：

```text
User A

選擇：
「再聊 15 分鐘」

        │
        ▼

顯示：
「等待對方選擇⋯」
```

User A 不會知道 User B 在完成決策前的選擇狀態。

---

### 11. 決策時間

Session #1 正常結束後，雙方具有：

> **60 秒決策時間**

此 60 秒屬於獨立的決策階段。

不計入：

- Session #1 的 15 分鐘
- Session #2 的 15 分鐘

流程：

```text
Session #1 結束
        │
        ▼
開始 60 秒決策時間
        │
        ├── 雙方皆選擇繼續
        │          │
        │          ▼
        │     建立 Session #2
        │
        ├── 任一方選擇結束
        │          │
        │          ▼
        │       結束聊天
        │
        └── 任一方 60 秒內未完成選擇
                   │
                   ▼
                視為不同意
                   │
                   ▼
                結束聊天
```

> **決策剩餘時間顯示**

進入 60 秒決策階段後，系統應持續顯示目前剩餘的決策時間。

例如：

```text

01:00

  ↓

00:45

  ↓

00:30

  ↓

00:15

  ↓

00:00
```

---

### 12. 決策逾時

若任一方未在 **60 秒內**完成選擇：

> **系統將該使用者視為選擇「結束聊天」。**

不需要另一方繼續等待。

系統不向另一方透露：

- 對方主動選擇結束
- 對方沒有進行選擇
- 對方發生決策 Timeout

對另一方統一呈現聊天未繼續的結果。

設計目的：

- 避免使用者長時間停留於等待狀態。
- 避免透過選擇結果造成額外社交壓力。
- 保護雙方決策隱私。
- 讓聊天流程具有明確結束點。

---

### 13. 第二次 Chat Session

只有當雙方皆在決策時間內選擇：

> **再聊 15 分鐘**

系統才建立：

> **Session #2**

Session #2 為新的 Chat Session，聊天時間重新設定為完整 **15 分鐘**。

流程：

```text
Session #1 結束
        │
        ▼
60 秒決策階段
        │
        ▼
User A：繼續
User B：繼續
        │
        ▼
建立 Session #2
        │
        ▼
重新開始 15 分鐘
```

雙方不需要重新配對，也不建立新的陌生人配對關係。

---

### 14.Session #1 與 Session #2 聊天紀錄顯示

Session #1 與 Session #2 為同一組陌生人配對關係中的兩個獨立聊天階段。

當 Session #1 正常結束，且雙方於 Continue Decision 中皆選擇「再聊 15 分鐘」後，系統建立 Session #2。

Session #2 開始後：

> **不再向雙方顯示 Session #1 的聊天訊息。**

Session #2 為新的聊天階段，使用者進入 Session #2 時，聊天訊息顯示區域從新的 Session 開始。

流程：

```text

Session #1

15 分鐘

    │

    ▼

Normal End

    │

    ▼

Continue Decision

    │

    ▼

雙方皆同意繼續

    │

    ▼

Session #2

15 分鐘

    │

    └── 不顯示 Session #1 訊息

```

此設計將兩次 Chat Session 區分為不同的關係階段：

| Chat Session | 階段定位 | 聊天紀錄 |

|---|---|---|

| Session #1 | 初次探索與認識 | 不帶入 Session #2 顯示 |

| Session #2 | 雙方主動選擇繼續後的交流 | 可於 Connection 成立後延續 |

Session #1 不帶入 Session #2，不代表其資料必須於 Session #2 建立時立即從 Server 永久刪除。

Session #1 的實際資料保存時間、刪除機制、安全緩衝、Report 與 Moderation 所需資料保存方式，由後續資料保存與安全相關章節統一定義。

---

### 15. 第二次 Chat Session 結束

Session #2 最長為 **15 分鐘**。

Session #2 正常時間結束後：

- 不再提供第三次 15 分鐘聊天。
- 不再提供一般續聊選項。
- 停止目前 Chat Session 的訊息傳送功能。
- 進入 Connection 決策階段。

流程：

```text
Session #2
15 分鐘
    │
    ▼
Session End
    │
    ▼
Connection 決策
```

Connection 的建立條件與決策流程由第十章「Connection（建立聯繫）」統一定義。

---

### 16. Session #2 與 Connection Chat 的聊天紀錄延續

Session #2 為雙方完成第一次聊天後，皆主動選擇繼續交流才建立的第二階段 Chat Session。

若 Session #2 正常結束，且雙方後續皆同意建立 Connection：

> **Session #2 的聊天訊息將作為 Connection Chat 的可見歷史紀錄保留。**

Connection 建立後，不重新顯示 Session #1 的聊天訊息。

因此 Connection Chat 的可見聊天紀錄由以下內容組成：

1. Session #2 的聊天訊息

2. Connection 建立狀態提示

3. Connection 建立後產生的新訊息

概念流程：

```text

Session #1

    │

    │ 不帶入下一階段顯示

    ▼

Session #2

    │

    │ 雙方同意建立 Connection

    ▼

Connection Created

    │

    ▼

Connection Chat

    │

    ├── Session #2 歷史訊息

    │

    ├── Connection 建立提示

    │

    └── Connection 後的新訊息

```

使用者介面應讓 Session #2 至 Connection Chat 的轉換保持自然延續。

例如：

```text

──────── Session #2 ────────

A：你剛剛說你也喜歡去日本？

B：對啊，我去年去了北海道

A：我超想去 😂

B：冬天真的很漂亮

────────────────────────────

你們已建立 Connection

現在可以繼續聊天

────────────────────────────

A：所以你最推薦北海道哪裡？

```

Connection 建立後：

- 不再受到 15 分鐘 Chat Session 時間限制。

- 不再進入 Chat Session Decision。

- Session #2 訊息持續對雙方可見。

- Session #1 訊息不重新出現在 Connection Chat。

- Connection 後的新訊息接續於 Session #2 之後。

此設計的產品階段概念為：

```text

Session #1

第一次遇見

    │

    ▼

Session #2

雙方選擇繼續

    │

    ▼

Connection

雙方選擇留下

```

其核心設計原則為：

> **第一次是遇見，第二次是選擇，Connection 是留下。**

聊天紀錄的實際 Server 儲存結構、資料轉移方式、Conversation 關聯方式與 Data Retention Policy 不於本章限定，於後續技術規格與資料保存規格中統一定義。

---

### 17. 主動離開

使用者可依第七章規則，在 Chat Session 進行期間主動離開聊天室。

若任一方主動離開：

```text
ACTIVE SESSION
      │
      ▼
使用者主動離開
      │
      ▼
提前結束目前 Session
      │
      ▼
結束本次聊天
```

主動離開代表該使用者已明確表達不繼續本次交流。

因此：

- 不等待目前 15 分鐘結束。
- 不進入續聊決策。
- 不建立下一個 Chat Session。
- 不進入 Connection 決策。
- 另一方收到本次聊天已結束的結果。

---

### 18. Chat Session 核心規則

FlashTalk Chat Session 核心規則統一如下：

| 項目 | 規則 |
|---|---|
| 單次聊天時間 | 15 分鐘 |
| Session #1 | 配對成功後建立 |
| Session #2 | Session #1 結束後雙方同意才建立 |
| Session #3 | 不提供 |
| 剩餘時間 | 持續顯示 |
| 主動倒數提醒 | 不提供 |
| 時間基準 | Server |
| App Background | 持續計時 |
| 手機鎖定 | 持續計時 |
| 暫時斷線 | 持續計時 |
| 重新連線 | 返回原 Session，不重置時間 |
| Session 到期 | 停止接受新訊息 |
| Session #1 結束 | 進入續聊決策 |
| 續聊決策時間 | 60 秒 |
| 決策逾時 | 視為不同意 |
| 雙方選擇結果 | 決策完成前互相不可見 |
| 雙方皆同意續聊 | 建立 Session #2 |
| Session #2 結束 | 進入 Connection 決策 |
| 主動離開 | 提前結束，不進入續聊或 Connection 決策 |

---

## 九、聊天結束與續聊決策（Session End & Continue Decision）

FlashTalk 將 Chat Session 的結束分為：

1. 正常結束（Normal End）
2. 提前結束（Early End）
3. 異常結束（Abnormal End）

只有 **Chat Session 因 15 分鐘聊天時間自然到期而正常結束**，才會進入後續 Decision 流程。

其他提前或異常結束情況，不進入續聊或 Connection 決策。

---

### 1. Session 結束類型

Chat Session 可能因不同原因結束。

基本分類如下：

```text
Chat Session
      │
      ▼
 Session End
      │
      ├── Normal End
      │      │
      │      └── 15 分鐘聊天時間自然到期
      │
      ├── Early End
      │      │
      │      ├── 使用者主動離開
      │      └── 使用者檢舉並離開
      │
      └── Abnormal End
             │
             ├── 長時間斷線
             ├── 帳號失去聊天權限
             ├── Safety 機制終止
             └── 系統強制終止
```

不同結束原因應保留其實際結束類型，以供後續安全機制、營運分析、系統監控與問題追蹤使用。

具體技術狀態、Enum 與事件名稱於後續技術規格中定義。

---

### 2. 正常結束（Normal End）

當 Chat Session 完整進行至 15 分鐘，並因聊天時間自然到期而結束時，視為：

> **Normal End**

Normal End 為唯一可以進入後續 Decision 的 Session 結束類型。

依 Session 階段不同：

```text
Session #1 Normal End
        │
        ▼
Continue Decision
        │
        ▼
是否再聊 15 分鐘？
```

```text
Session #2 Normal End
        │
        ▼
Connection Decision
        │
        ▼
是否建立 Connection？
```

Session #1 的 Continue Decision 由本章定義。

Session #2 的 Connection Decision 與 Connection 建立流程由第十章定義。

---

### 3. 提前結束（Early End）

若 Chat Session 尚未到達 15 分鐘，但因使用者主動行為提前結束，視為：

> **Early End**

包含：

- 使用者主動離開聊天室
- 使用者檢舉並離開聊天室

Early End 代表目前聊天已明確提前結束。

因此：

- 不進入 Continue Decision
- 不進入 Connection Decision
- 不建立新的 Chat Session
- 不等待目前 Session 原定結束時間

流程：

```text
ACTIVE SESSION
      │
      ▼
Early End
      │
      ▼
結束本次聊天
```

具體離開聊天室與檢舉流程分別依第七章及安全機制相關章節定義。

---

### 4. 異常結束（Abnormal End）

若 Chat Session 因非一般使用者結束行為而無法繼續進行，視為：

> **Abnormal End**

可能包含：

- 長時間無法重新連線
- 帳號失去聊天權限
- 帳號受到系統限制
- Safety 機制強制終止聊天室
- 系統異常導致 Session 無法繼續
- 其他系統強制終止原因

Abnormal End 不進入後續 Decision。

流程：

```text
ACTIVE SESSION
      │
      ▼
Abnormal End
      │
      ▼
結束本次聊天
```

暫時性網路中斷本身不立即視為 Abnormal End。

若使用者仍處於允許重新連線的範圍內，應依第七、八章重新連線規則處理。

具體重新連線期限、異常狀態判斷與系統終止條件於後續技術規格中定義。

---

### 5. Decision 共通機制

FlashTalk 在需要雙方共同決定下一階段關係時，採用：

> **雙向盲選（Blind Decision）**

Decision 的核心原則為：

- 雙方分別獨立進行選擇
- 不顯示對方目前選擇
- 雙方皆同意才成立
- 任一方不同意則 Decision 不成立
- Decision Timeout 視為不同意
- 使用者送出選擇後不可修改
- 不公開是哪一方選擇不同意
- 不公開對方是否因 Timeout 而未完成選擇

此機制適用於：

1. Continue Decision
2. Connection Decision

---

### 6. Decision 選擇隱私

Decision 進行期間，雙方不可查看對方的選擇。

例如：

```text
User A
選擇「再聊 15 分鐘」
        │
        ▼
等待對方選擇⋯
```

此時 User A 不會知道：

- User B 是否已經選擇
- User B 選擇繼續或結束
- User B 是否暫時離線
- User B 是否最終發生 Timeout

只有 Decision 最終結果會呈現給使用者。

---

### 7. Decision 送出後不可修改

使用者完成 Decision 並送出選擇後：

> **不得修改已送出的選擇。**

例如：

```text
User A
選擇「再聊 15 分鐘」
        │
        ▼
Decision Submitted
        │
        ▼
不可修改
```

此規則適用於：

- Continue Decision
- Connection Decision

避免 Decision 期間因重複修改造成雙方結果與系統狀態不一致。

---

### 8. 任一方選擇不同意

若任一方明確選擇不同意，代表該 Decision 已無法成立。

系統不需要繼續等待另一方完成剩餘決策時間。

例如：

```text
User A：CONTINUE
User B：END
        │
        ▼
Decision Failed
        │
        ▼
結束聊天
```

或：

```text
User A：尚未選擇
User B：END
        │
        ▼
Decision Failed
        │
        ▼
結束聊天
```

即使另一方尚未完成選擇，系統仍可立即結束目前 Decision。

---

### 9. Decision 結果呈現

若 Decision 未成立，不向使用者公開失敗原因。

不顯示：

```text
對方拒絕了你
```

不顯示：

```text
對方沒有選擇繼續聊天
```

不顯示：

```text
對方選擇逾時
```

統一使用中性結果，例如：

> **本次聊天已結束。**

設計目的：

- 降低被拒絕感
- 降低陌生人社交壓力
- 保護雙方決策隱私
- 避免使用者對另一方產生不必要的負面情緒

---

### 10. Continue Decision

當 Session #1 因 15 分鐘時間自然到期而 Normal End 後，進入：

> **Continue Decision**

系統詢問雙方：

> **是否再聊 15 分鐘？**

雙方可選擇：

- 再聊 15 分鐘
- 結束聊天

Continue Decision 時間為：

> **60 秒**

---

### 11. Continue Decision 剩餘時間

進入 Continue Decision 後，系統應持續顯示剩餘決策時間。

例如：

```text
01:00
  ↓
00:59
  ↓
00:30
  ↓
00:10
  ↓
00:00
```

Decision Timer 只作為剩餘時間顯示。

不提供：

- 額外倒數通知
- 剩餘 30 秒警告
- 剩餘 10 秒警告
- 震動提醒
- 音效提醒
- 強制彈出提示

使用者完成選擇後，若 Decision 尚未產生最終結果，畫面仍持續顯示剩餘決策時間。

例如：

```text
已送出你的選擇

等待對方選擇⋯

00:37
```

Decision 剩餘時間以 Server 管理的 Decision 到期時間為準。

---

### 12. Continue Decision 成立

只有當雙方皆在 60 秒內選擇：

> **再聊 15 分鐘**

Continue Decision 才成立。

流程：

```text
Session #1 Normal End
        │
        ▼
Continue Decision
      60 秒
        │
        ▼
User A：CONTINUE
User B：CONTINUE
        │
        ▼
Decision Success
        │
        ▼
建立 Session #2
        │
        ▼
重新開始 15 分鐘聊天
```

Session #2 延續原 Chat Room 與既有聊天上下文。

---

### 13. Continue Decision 不成立

以下任一情況發生時，Continue Decision 不成立：

#### 情況 A：任一方選擇結束

```text
A：CONTINUE
B：END
     │
     ▼
聊天結束
```

#### 情況 B：雙方皆選擇結束

```text
A：END
B：END
   │
   ▼
聊天結束
```

#### 情況 C：任一方 Decision Timeout

```text
A：CONTINUE
B：TIMEOUT
       │
       ▼
TIMEOUT 視為 END
       │
       ▼
聊天結束
```

Decision 不成立後：

- 不建立 Session #2
- 不進入 Connection Decision
- 不公開是哪一方不同意
- 不公開是否有人發生 Timeout
- 統一進入聊天結束流程

---

### 14. Continue Decision Timeout

若使用者未在 **60 秒內**完成 Continue Decision：

> **系統將該使用者視為選擇「結束聊天」。**

即：

```text
TIMEOUT = END
```

Timeout 後不可補送原 Decision。

---

### 15. Decision 階段網路中斷

若使用者在 Decision 階段發生暫時性網路中斷：

> **不立即視為不同意。**

Decision Timer 持續計時，不暫停、不重新開始、不延長。

例如：

```text
Continue Decision
剩餘 00:45
      │
      ▼
網路中斷
      │
      │ Timer 持續
      ▼
重新連線
      │
      ▼
恢復 Decision
剩餘 00:27
```

若使用者在 Decision 到期前成功重新連線，且尚未送出選擇，可以繼續完成 Decision。

若直到：

```text
00:00
```

仍未完成選擇，則：

```text
TIMEOUT
   │
   ▼
視為 END
```

---

### 16. Session #2 與 Connection Decision

當 Continue Decision 成立後，系統建立 Session #2。

Session #2 正常進行最多 15 分鐘。

當 Session #2 因時間自然到期而 Normal End：

```text
Session #2 Normal End
        │
        ▼
Connection Decision
```

Connection Decision 採用與 Continue Decision 相同的共通規則，包括：

- 雙向盲選
- 選擇互相不可見
- 送出後不可修改
- 雙方皆同意才成立
- 任一方不同意則立即不成立
- Timeout 視為不同意
- 不公開個別選擇結果
- 顯示剩餘決策時間
- Decision Timer 以 Server 為準
- 暫時斷線不暫停 Decision Timer

但 Connection Decision 的決策時間調整為：

> **2 分鐘（120 秒）**

其完整 Connection 建立條件與後續行為由第十章「Connection（建立聯繫）」定義。

---

### 17. Decision 時間總覽

| Decision 類型 | 觸發條件 | 決策時間 | 成立條件 | Timeout |
|---|---|---:|---|---|
| Continue Decision | Session #1 Normal End | 60 秒 | 雙方皆選擇繼續 | 視為不同意 |
| Connection Decision | Session #2 Normal End | 120 秒 | 雙方皆同意建立 Connection | 視為不同意 |

---

### 18. Session End 與 Decision 流程總覽

```text
Session #1
15 分鐘
    │
    ├── Early End
    │       │
    │       ▼
    │    聊天結束
    │
    ├── Abnormal End
    │       │
    │       ▼
    │    聊天結束
    │
    └── Normal End
            │
            ▼
    Continue Decision
         60 秒
            │
       ┌────┴────┐
       │         │
   雙方同意    NO / TIMEOUT
       │         │
       ▼         ▼
  Session #2   聊天結束
    15 分鐘
       │
       ├── Early End
       │       │
       │       ▼
       │    聊天結束
       │
       ├── Abnormal End
       │       │
       │       ▼
       │    聊天結束
       │
       └── Normal End
               │
               ▼
       Connection Decision
            120 秒
               │
          ┌────┴────┐
          │         │
       雙方同意   NO / TIMEOUT
          │         │
          ▼         ▼
     Connection   聊天結束
```

---

### 19. 核心規則

| 項目 | 規則 |
|---|---|
| Normal End | Session 15 分鐘自然到期 |
| Early End | 使用者主動提前結束 |
| Abnormal End | 斷線逾時、安全或系統原因終止 |
| Normal End | 可依 Session 階段進入 Decision |
| Early End | 不進入 Decision |
| Abnormal End | 不進入 Decision |
| Decision 模式 | 雙向盲選 |
| 對方選擇 | 不公開 |
| 選擇送出後 | 不可修改 |
| 雙方同意 | Decision 成立 |
| 任一方不同意 | Decision 立即不成立 |
| Decision Timeout | 視為不同意 |
| Decision 失敗原因 | 不向另一方公開 |
| Continue Decision | 60 秒 |
| Connection Decision | 120 秒 |
| Decision 剩餘時間 | 顯示 |
| Decision 主動倒數提醒 | 不提供 |
| Decision 暫時斷線 | Timer 持續計時 |
| Session #1 Continue 成功 | 建立 Session #2 |
| Session #2 Connection 成功 | 建立 Connection |

---

## 十、Connection（建立聯繫）

Connection 代表兩名使用者完成兩階段限時聊天後，透過雙向同意建立的持續聯繫關係。

FlashTalk 不以傳統「好友邀請」或「追蹤」作為陌生人關係建立方式。

使用者必須依序完成：

```text
陌生人配對
    │
    ▼
Session #1
15 分鐘
    │
    ▼
Continue Decision
    │
    ▼
雙方同意繼續
    │
    ▼
Session #2
15 分鐘
    │
    ▼
Connection Decision
    │
    ▼
雙方同意建立 Connection
    │
    ▼
Connected
```

Connection 的核心概念為：

> **雙方經過兩階段聊天後，都明確選擇願意繼續保持聯繫。**

---

### 1. Connection 定義

Connection 是 FlashTalk 中雙方建立長期聯繫關係的正式狀態。

Connection 不等同於：

- Follow
- Follower
- Friend Request
- 單方面加好友
- 單方面收藏使用者

Connection 必須由雙方共同確認後才能成立。

不存在單方面建立 Connection 的情況。

關係流程：

```text
STRANGER
    │
    ▼
MATCHED
    │
    ▼
Session #1
    │
    ▼
Session #2
    │
    ▼
Connection Decision
    │
    ▼
CONNECTED
```

MVP 統一使用：

> **Connection**

作為雙方持續聯繫關係的產品名稱，不另外建立 Friend / Follow 等其他社交關係。

---

### 2. Connection Decision 觸發條件

只有 Session #2 因 15 分鐘聊天時間自然到期並形成：

> **Normal End**

才會進入 Connection Decision。

流程：

```text
Session #2
15 分鐘
    │
    ▼
Normal End
    │
    ▼
Connection Decision
```

若 Session #2 屬於：

- Early End
- Abnormal End

則不進入 Connection Decision。

例如：

```text
Session #2
    │
    ├── 使用者主動離開
    ├── 檢舉並離開
    ├── 長時間斷線
    ├── Safety 強制終止
    └── 系統強制終止
            │
            ▼
        聊天結束
            │
            ▼
不進入 Connection Decision
```

Session End 類型依第九章定義。

---

### 3. Connection Decision

Session #2 Normal End 後，系統詢問雙方：

> **是否願意和對方建立 Connection？**

產品介面可使用較自然的使用者文案，例如：

```text
想繼續和對方保持聯繫嗎？

[ 就聊到這裡 ]

[ 建立 Connection ]
```

雙方分別獨立完成選擇。

Connection Decision 採用第九章定義的 Decision 共通機制。

---

### 4. Connection Decision 時間

Connection Decision 的決策時間為：

> **2 分鐘（120 秒）**

進入 Connection Decision 後，系統開始 Decision Timer。

例如：

```text
02:00
  ↓
01:59
  ↓
01:30
  ↓
01:00
  ↓
00:30
  ↓
00:00
```

Decision Timer 應持續顯示於 Connection Decision 畫面。

不提供：

- 額外倒數警告
- 剩餘 1 分鐘通知
- 剩餘 30 秒通知
- 剩餘 10 秒警告
- 震動提醒
- 音效提醒
- 強制彈出提示

Decision Timer 以 Server 管理的到期時間為準。

---

### 5. Connection Decision 共通規則

Connection Decision 完全沿用第九章定義的 Blind Decision 共通規則。

包含：

- 雙方獨立選擇
- 雙方選擇互相不可見
- 選擇送出後不可修改
- 雙方皆同意才成立
- 任一方不同意則 Decision 不成立
- 任一方不同意後不需要繼續等待
- Decision Timeout 視為不同意
- 不公開是哪一方不同意
- 不公開對方是否發生 Timeout
- 暫時性網路中斷不暫停 Decision Timer
- 重新連線後可於剩餘時間內恢復 Decision

Connection Decision 不另外建立另一套決策規則。

---

### 6. Connection 建立條件

只有雙方皆在 120 秒內選擇：

> **建立 Connection**

Connection Decision 才成立。

例如：

```text
User A：CONNECT
User B：CONNECT
        │
        ▼
Decision Success
        │
        ▼
Create Connection
        │
        ▼
CONNECTED
```

Connection 建立必須為雙向同意。

不得因單一使用者選擇 CONNECT 而建立 Connection。

---

### 7. Connection Decision 不成立

以下任一情況發生時，Connection Decision 不成立：

#### 情況 A：任一方選擇不建立 Connection

```text
User A：CONNECT
User B：END
        │
        ▼
Connection Not Created
        │
        ▼
聊天結束
```

#### 情況 B：雙方皆選擇不建立 Connection

```text
User A：END
User B：END
      │
      ▼
Connection Not Created
      │
      ▼
聊天結束
```

#### 情況 C：任一方 Decision Timeout

```text
User A：CONNECT
User B：TIMEOUT
        │
        ▼
TIMEOUT = END
        │
        ▼
Connection Not Created
        │
        ▼
聊天結束
```

Connection Decision 不成立後：

- 不建立 Connection
- 不建立 Connection Chat
- 不加入 Connection List
- 雙方仍維持非 Connection 關係
- 不公開是哪一方不同意
- 不公開是否有人發生 Timeout

---

### 8. Connection Decision 結果隱私

Connection Decision 不成立時，不向任何一方公開另一方的實際選擇。

不顯示：

```text
對方拒絕建立 Connection
```

不顯示：

```text
對方不想繼續和你聯絡
```

不顯示：

```text
對方沒有在時間內做出選擇
```

系統統一使用中性結果，例如：

> **本次聊天已結束。**

避免讓 Connection Decision 形成額外的拒絕壓力。

---

### 9. Connection 建立

當 Connection Decision 成立後，系統建立雙方的 Connection 關係。

流程：

```text
Connection Decision
        │
        ▼
雙方 CONNECT
        │
        ▼
Create Connection
        │
        ▼
CONNECTED
```

Connection 建立後：

- 雙方正式成為 Connection
- 雙方可以持續聊天
- 不再受到 15 分鐘 Chat Session 限制
- 不再進入 Continue Decision
- 不再進入 Connection Decision
- 建立 Connection Chat
- Connection 顯示於雙方的 Connection List
- Session #2 聊天紀錄延續至 Connection Chat

---

### 10. Connection Chat

Connection 建立後，雙方進入：

> **Connection Chat**

Connection Chat 為雙方建立 Connection 後使用的持續聊天空間。

Connection Chat 不再使用陌生人 Chat Session 的 15 分鐘限制。

因此：

```text
Connection Chat
      │
      ├── 無 15 分鐘限制
      ├── 無 Chat Session Timer
      ├── 無 Continue Decision
      └── 無 Connection Decision
```

只要 Connection 關係仍存在，雙方即可持續使用 Connection Chat。

---

### 11. Connection Chat 訊息功能

MVP 階段的 Connection Chat 沿用陌生人聊天室的基本訊息功能。

支援：

- 文字訊息
- Emoji
- Reply

Reply 可引用原訊息的基本內容與上下文，但不建立獨立 Thread。

MVP 不提供：

- 圖片
- 影片
- 檔案
- 語音訊息
- 外部連結
- 訊息複製
- 訊息刪除
- 訊息收回
- 訊息編輯

Connection Chat 的進階訊息能力不列入目前 MVP 核心範圍。

---

### 12. Session #2 聊天紀錄延續

Connection 建立後：

> **只將 Session #2 作為 Connection Chat 的可見歷史聊天紀錄延續。**

Session #1 不重新顯示於 Connection Chat。

因此：

```text
Session #1
    │
    │ 不帶入 Connection Chat 顯示
    ▼
Session #2
    │
    │ 雙方同意建立 Connection
    ▼
Connection Created
    │
    ▼
Connection Chat
    │
    ├── Session #2 歷史訊息
    ├── Connection 建立提示
    └── Connection 建立後的新訊息
```

Connection Chat 的使用者可見聊天紀錄為：

1. Session #2 聊天訊息
2. Connection 建立狀態提示
3. Connection 建立後產生的新訊息

---

### 13. Session #1 不重新顯示

Session #1 屬於雙方第一次陌生人探索聊天階段。

即使雙方最終成功建立 Connection：

> **Session #1 訊息仍不重新出現在 Connection Chat。**

不得因 Connection 建立而重新恢復 Session #1 的使用者可見聊天紀錄。

產品階段概念為：

```text
Session #1
第一次遇見
    │
    ▼
Session #2
雙方選擇繼續
    │
    ▼
Connection
雙方選擇留下
```

核心設計原則：

> **第一次是遇見，第二次是選擇，Connection 是留下。**

Session #1 是否仍於 Server 保存，以及實際保存期限，不由 Connection 的使用者介面可見性決定。

其資料保存、刪除、安全緩衝、Report 與 Moderation 規則由後續 Data Retention 與 Safety 相關規格統一定義。

---

### 14. Connection 建立提示

Connection 建立成功後，Connection Chat 應於 Session #2 訊息與後續 Connection 訊息之間顯示狀態提示。

例如：

```text
A：你剛剛說你也喜歡去日本？
B：對啊，我去年去了北海道
A：我超想去 😂
B：冬天真的很漂亮

────────────────────────

你們已建立 Connection

現在可以繼續聊天

────────────────────────

A：所以你最推薦北海道哪裡？
```

此提示用於明確區分：

```text
限時陌生人聊天
        ↓
Connection
        ↓
持續聊天
```

Connection 建立後不需要重新建立使用者可感知的新聊天流程。

產品介面應讓 Session #2 至 Connection Chat 的轉換保持自然延續。

---

### 15. Connection List

Connection 建立後，雙方應出現在彼此的：

> **Connection List**

Connection List 為使用者重新進入既有 Connection Chat 的主要入口。

MVP 至少顯示：

- 對方頭像
- 對方暱稱
- 最後一則訊息摘要
- 最後訊息時間
- 未讀訊息數量

概念：

```text
Connections

┌──────────────────────────┐
│ Avatar  Alice            │
│ 最後一則訊息內容...      │
│                    10:32 │
│                      ● 2 │
└──────────────────────────┘

┌──────────────────────────┐
│ Avatar  Ian              │
│ 哈哈哈真的 😂            │
│                     昨天 │
└──────────────────────────┘
```

Connection List 不等同於 Follow / Followers / Friends List。

其目的僅為管理已建立 Connection 的持續聊天關係。

---

### 16. 已建立 Connection 的使用者不得再次互相配對

當兩名使用者目前存在有效 Connection：

```text
User A ↔ User B
     CONNECTED
```

系統不得再次將兩人進行陌生人配對。

此規則同時適用於：

- 興趣配對
- 全隨機配對

例如：

```text
A 與 B 已 CONNECTED

A 開始興趣配對
B 開始興趣配對
        │
        ▼
A / B 不得再次互相配對
```

Connection 存在期間，雙方應透過 Connection Chat 持續聯繫，而不是重新進入陌生人配對流程。

---

### 17. 解除 Connection

Connection 建立後，任一方皆可主動：

> **解除 Connection（Unconnect）**

解除 Connection 不需要另一方同意。

流程：

```text
CONNECTED
    │
    ▼
任一方選擇解除 Connection
    │
    ▼
確認解除
    │
    ▼
Connection End
```

解除 Connection 後：

- Connection 關係失效
- 雙方停止使用原 Connection Chat
- 不再以有效 Connection 關係顯示
- Connection Chat 不再接受新的聊天訊息

解除 Connection 為單方面即可完成的關係終止操作。

---

### 18. 解除 Connection 與 Block 的差異

解除 Connection 與 Block 為不同概念。

解除 Connection 代表：

> **結束目前持續聯繫關係。**

Block 則屬於安全與使用者保護機制。

因此：

```text
Unconnect
≠
Block
```

解除 Connection 本身不代表永久禁止雙方再次遇見。

若未來雙方重新符合配對條件：

> **仍可能再次被系統配對。**

若使用者希望避免未來再次與特定使用者配對，應由後續 Block / Safety 機制定義。

Block、Blacklist 與重新配對限制於安全機制相關章節統一定義。

---

### 19. 解除 Connection 後的聊天紀錄

解除 Connection 後，原 Connection Chat 停止提供新的聊天功能。

但：

> **解除 Connection 不直接等同於立即永久刪除 Server 上的所有聊天資料。**

聊天資料的實際處理可能涉及：

- Data Retention
- Safety Buffer
- Report
- Moderation
- Account Safety
- 系統資料保存政策

因此，本章僅定義：

> **解除 Connection 後，原 Connection Chat 對雙方停止作為有效聊天空間使用。**

實際聊天資料保存期限與刪除方式，由後續資料保存與安全相關規格統一定義。

---

### 20. Connection 生命週期

Connection 的基本生命週期如下：

```text
Session #2 Normal End
          │
          ▼
Connection Decision
       120 秒
          │
     ┌────┴─────┐
     │          │
雙方 CONNECT   END / TIMEOUT
     │          │
     ▼          ▼
CONNECTED     聊天結束
     │
     ├── Connection Chat
     ├── Connection List
     ├── 持續聊天
     ├── Report / Safety
     │
     └── Unconnect
             │
             ▼
      CONNECTION ENDED
```

---

### 21. Connection 與聊天紀錄生命週期

使用者可見聊天紀錄的階段關係如下：

```text
Session #1
15 分鐘
    │
    ▼
Continue Decision
    │
    │ 雙方同意
    ▼
Session #2
15 分鐘
    │
    │ Session #1 不顯示
    ▼
Connection Decision
120 秒
    │
    ├── 雙方同意
    │       │
    │       ▼
    │   Connection
    │       │
    │       ├── 保留 Session #2 可見紀錄
    │       ├── 不恢復 Session #1
    │       └── 持續產生 Connection 訊息
    │
    └── 未成立
            │
            ▼
        聊天結束
```

此設計使聊天紀錄與雙方關係深化程度保持一致。

---

### 22. Connection 核心規則

| 項目 | 規則 |
|---|---|
| Connection 觸發條件 | Session #2 Normal End |
| Connection Decision | 120 秒 |
| Decision 模式 | 雙向盲選 |
| Decision 剩餘時間 | 顯示 |
| Decision 主動提醒 | 不提供 |
| 建立條件 | 雙方皆同意 |
| 任一方不同意 | 不建立 Connection |
| Timeout | 視為不同意 |
| 個別選擇結果 | 不公開 |
| Connection 建立後 | 開放持續聊天 |
| 15 分鐘限制 | Connection 後取消 |
| Connection Chat | 提供 |
| Session #1 紀錄 | 不帶入、不重新顯示 |
| Session #2 紀錄 | Connection 成功後延續顯示 |
| Connection 後訊息 | 接續 Session #2 |
| 訊息功能 | 文字、Emoji、Reply |
| 圖片 / 影片 / 檔案 / 語音 | MVP 不提供 |
| 訊息複製 / 刪除 / 收回 / 編輯 | MVP 不提供 |
| Connection List | 提供 |
| 已 Connection 雙方重新配對 | 不允許 |
| 解除 Connection | 任一方可單方面解除 |
| 解除是否需要對方同意 | 不需要 |
| Unconnect | 不等同 Block |
| Unconnect 後重新配對 | 未受 Block 等限制時仍可能再次配對 |
| 解除後聊天 | 停止使用原 Connection Chat |
| Server 資料實際刪除 | 由 Data Retention / Safety 規格定義 |

---

## 十一、安全機制（Safety）

系統透過「配對冷卻（Match Cooldown）」、「檢舉（Report）」及「黑名單（Blacklist）」三項機制，兼顧使用者安全與配對效率。

---

### 配對冷卻（Match Cooldown）

每次聊天室結束後，系統將自動建立雙方的暫時性配對冷卻時間。

#### 規則

- 聊天室結束後，雙方於配對冷卻期間內不會再次互相配對。
- 配對冷卻期間內，配對系統將暫時排除雙方互相配對。
- 配對冷卻時間結束後，系統將自動解除該限制，雙方可再次互相配對。
- 配對冷卻時間由系統統一管理，可依平台營運需求於後台調整，不對使用者公開設定值。
- 配對冷卻機制由系統自動執行，使用者無須任何操作。

#### 配對冷卻流程

當聊天室結束時，系統將自動建立一筆配對冷卻紀錄。

配對冷卻紀錄包含：

- User A
- User B
- 建立時間
- 到期時間

配對服務於媒合候選人時，將先檢查是否存在尚未到期的配對冷卻紀錄。

若存在有效紀錄，則暫時排除雙方互相配對；若紀錄已到期，則自動失效，不需額外解除或人工操作。

配對冷卻僅影響該兩位使用者之間的配對，不影響其與其他使用者的正常配對流程。

#### 設計目的

- 避免短時間內反覆配對到同一位使用者。
- 提升陌生人聊天的新鮮感。
- 降低人數不足造成的重複配對情形。
- 不永久排除任何正常使用者，維持配對新鮮感。

---

### 檢舉（Report）

使用者可於聊天過程中或聊天結束後檢舉對方。

#### 檢舉原因

- 色情或性騷擾
- 詐騙或可疑行為
- 廣告或垃圾訊息
- 不當言論
- 惡意騷擾
- 假帳號
- 其他

#### 檢舉流程

1. 使用者送出檢舉。
2. 系統保留該聊天室聊天紀錄作為審查依據。
3. 後台管理員（或 AI 輔助審查）進行案件審核。
4. 根據審核結果決定是否採取後續處置。

---

### 聊天紀錄保存

- 一般聊天室於保存期限到達後自動永久刪除。
- 若聊天室涉及檢舉案件，聊天紀錄將保留至案件審核完成後，再依平台保存政策處理。
- 聊天紀錄僅供安全審查用途，不提供使用者查閱。

---

### 黑名單（Blacklist）

黑名單為平台安全機制之一，不提供使用者自行建立或解除。

#### 建立方式

僅於檢舉案件經平台審核確認違規後，由系統建立黑名單。

#### 黑名單效果

- 雙方將永久不再互相配對。
- 系統可視違規程度，搭配限制功能、暫時停權或永久停權等處置。
- 黑名單資料僅供配對系統及平台安全管理使用。

#### 設計原則

- 「不想繼續聊天」不等於「永久封鎖」。
- 只有經平台確認存在安全或違規問題時，才建立永久性的配對限制。
- 避免使用者濫用封鎖功能，維持配對規模與配對品質。

---

### 配對系統限制

配對系統於建立聊天室前，至少需排除以下對象：

- 自己
- 已停權使用者
- 已在聊天室中的使用者
- 黑名單配對對象
- 配對冷卻期間內的配對對象

除上述限制外，其餘使用者皆可正常參與配對，由配對演算法依照配對條件進行排序與媒合。

---

## 十二、防騷擾設計（Anti-abuse）

為降低騷擾與詐騙風險：

僅允許：

- 文字
- Emoji

禁止：

- 圖片
- 影片
- 檔案
- 外部網址
- 社群連結

---

## 十三、產品流程（Product Flow）

### 使用流程

```text
開啟 App
    │
    ▼
註冊 / 登入
    │
    ▼
選擇配對方式
(興趣配對 / 全隨機)
    │
    ▼
等待配對
    │
    ▼
配對成功
    │
    ▼
15 分鐘聊天
    │
    ▼
聊天室關閉
    │
    ▼
是否再聊？
    │
 ┌──┴──────────┐
 │             │
 ▼             ▼
雙方同意       任一方不同意
 │             │
 ▼             ▼
建立新聊天室   安全緩衝區
 │
 ▼
15 分鐘聊天
 │
 ▼
第二次聊天結束
 │
 ▼
是否建立 Connection？
 │
┌──────────────┴─────────────┐
│                            │
▼                            ▼
雙方同意                  任一方不同意
│                            │
▼                            ▼
建立 Connection        聊天紀錄進入安全緩衝區
                             │
                  ┌──────────┴─────────┐
                  ▼                    ▼
                有檢舉              無檢舉
                  │                    │
                  ▼                    ▼
              人工審核          48 小時後永久刪除
```

---

### Mermaid 流程圖

```mermaid
flowchart TD

A[開啟 App]
-->B[註冊 / 登入]
-->C[選擇配對方式]

C-->D1[興趣配對]
C-->D2[全隨機配對]

D1-->E[等待配對]
D2-->E

E-->F[配對成功]

F-->G[15 分鐘聊天]

G-->H[聊天室關閉]

H-->I{雙方是否再聊?}

I--是-->J[建立新聊天室]

J-->K[15 分鐘聊天]

K-->L[第二次聊天結束]

L-->M{雙方是否建立 Connection?}

M--是-->N[建立 Connection]

M--否-->O[聊天室進入安全緩衝區]

O-->P{是否有檢舉?}

P--有-->Q[人工審核]

P--無-->R[48 小時後永久刪除]

I--否-->O
```

---

## 十四、技術規劃（Technology Stack）

| 項目 | 技術 |
| ------ | ------ |
| 前端 | React Native |
| API | RESTful API |
| 即時通訊 | WebSocket |
| 後端 | Node.js |
| 資料庫 | PostgreSQL |

---

## MVP 功能總覽

| 模組 | 功能 |
| ------ | ------ |
| 帳號 | Email 註冊、登入、驗證碼 |
| 個人資料 | 暱稱、頭像、興趣標籤 |
| 配對 | 興趣配對、全隨機配對 |
| 聊天 | 文字、Emoji |
| 時間 | 15 分鐘限時聊天 |
| 延長聊天 | 雙方同意建立新 Session |
| Connection | 第二次聊天後雙向同意建立 |
| 安全 | Block、Report |
| 聊天紀錄 | 48 小時安全緩衝區 |
| 防騷擾 | 禁止圖片、影片、檔案、外部連結 |
| 技術 | RESTful API、WebSocket、Node.js、PostgreSQL |

---

## 版本資訊

| 版本 | 日期 | 說明 |
|------|------|------|
| v1.4.0 | 2026-09-14 | FlashTalk MVP 第一版產品需求規格書（PRD） |
