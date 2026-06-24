# MG 銘勁 2026 夏季冷檢活動 Landing Page

`mg-service-summer-event`

一頁式靜態活動網頁，用於 **MG 銘勁汽車 2026 夏季冷檢活動**（活動期間 2026/7/1 – 2026/8/31）。

## 專案說明

本頁面用途：

1. LINE OA 群發導流
2. 服務廠現場海報 QR Code 導流
3. 說明夏季冷檢活動內容
4. 導流至微笑大使投票表單（外部 Microsoft Forms）
5. 推廣 PLUS 會員制度與車體險續保誘因

技術特性：

- 單一靜態網頁（HTML / CSS / JavaScript），**無後端、無資料庫、無登入**
- 不使用大型框架
- RWD 響應式設計，手機優先
- 可直接部署於 GitHub Pages
- 投票資料蒐集由外部 Microsoft Forms 負責，本頁僅導流

## 檔案結構

```text
mg-service-summer-event/
├── index.html        # 頁面結構與內容
├── style.css         # 所有樣式（質感簡約風格）
├── script.js         # 互動邏輯、外部連結常數、追蹤事件
├── assets/
│   ├── logo/         # logo.png（已放置，導覽列使用）
│   ├── images/       # 車輛主視覺與好禮照片（檔名見下方）
│   └── icons/        # icon 圖檔（目前以文字符號呈現）
└── README.md
```

### 圖片檔名約定（缺圖會自動隱藏不破版）

Logo（放於 `assets/logo/`）：

| 用途 | 檔名 |
| --- | --- |
| 導覽列 Logo | `logo.png` |
| Footer 白色 Logo | `logo(w).png` |

四大主題 icon（放於 `assets/icons/`，**單色透明背景 SVG**，由 CSS 自動套主題色）：

| 用途 | 檔名 |
| --- | --- |
| 免費 30 項冷氣健檢 | `overview-check.svg` |
| 冷氣系統套餐優惠 | `overview-aircon.svg` |
| 精選配件優惠 | `overview-parts.svg` |
| 滿額好禮與 PLUS 禮遇 | `overview-gift.svg` |

其餘圖片放於 `assets/images/`：

| 用途 | 檔名 | 建議 |
| --- | --- | --- |
| Hero 手機主視覺 | `hero-mobile.jpg` | 直式 3:4，約 1200×1600 |
| Hero 桌機主視覺 | `hero-desktop.jpg` | 橫式 16:9，約 2400×1350 |
| 健檢五大系統壓字圖 | `check-systems.jpg` | 橫向 16:9，約 1600×900 |
| 冷氣 A 套餐 | `package-a.jpg` | 16:10 |
| 冷氣 B 套餐 | `package-b.jpg` | 16:10 |
| 冷氣 C 套餐 | `package-c.jpg` | 16:10 |
| 前後碟盤組 | `part-disc.jpg` | 直向或方形皆可 |
| 陶瓷來令片組 | `part-pad.jpg` | 同上 |
| KYB 避震總成 | `part-kyb.jpg` | 同上 |
| 延長保固專案 | `part-warranty.jpg` | 同上 |
| 環保收納購物袋 | `gift-bag.png` | 4:3，約 800×600 |
| U 型枕 | `gift-pillow.png` | 4:3 |
| 香氛禮盒 | `gift-fragrance.jpg` | 4:3 |
| 品牌行李箱 | `gift-luggage.png` | 4:3 |
| 微笑大使保溫杯 | `prize-bottle.jpg` | 正方或直式 |

## 如何本機預覽

不需任何建置工具，擇一即可：

- **直接開啟**：以瀏覽器開啟 `index.html`。
- **本機伺服器（建議，避免相對路徑問題）**：

  ```bash
  # Python
  python -m http.server 8000
  # 然後瀏覽 http://localhost:8000
  ```

  ```bash
  # Node（需先安裝 serve）
  npx serve .
  ```

## 如何修改 Forms 連結

所有外部連結集中於 `script.js` 最上方常數，修改後存檔即可：

```js
// 微笑大使投票表單（Microsoft Forms）— 中壢廠、八德廠各一份
const VOTE_FORM_URL_ZHONGLI = "https://forms.office.com/r/CVUp4ib8e0"; // 中壢廠
const VOTE_FORM_URL_BADE = "https://forms.office.com/r/s5KHrR3CPi"; // 八德廠

// 預約回廠連結（MG 官網會員登入）
const BOOKING_URL = "https://www.mgmotor.com.tw/signin/login.html";

// PLUS 會員洽詢（LINE 官方帳號）
const PLUS_LINE_URL = "https://lin.ee/QVC8qnl";
```

修改網址後存檔即可，HTML 不需更動。

## 如何修改活動日期

活動日期目前以文字呈現，出現在以下位置（皆於 `index.html`）：

- Hero 區塊：`活動期間 ｜ 2026 / 7 / 1 — 2026 / 8 / 31 全面開跑`
- 注意事項區塊：`活動期間：2026 / 7 / 1 至 2026 / 8 / 31`
- `<title>` 與 `<meta description>`（如需更新 SEO 文案）

直接搜尋 `2026` 即可定位並修改。

## 如何加入追蹤碼（GA4 / GTM）

`index.html` `<head>` 內已預留位置：

```html
<!-- TODO: Insert GA4 or GTM tracking code here -->
```

貼上 GA4 或 GTM 程式碼後即生效。頁面上的 CTA 按鈕皆已標註 `data-track` 屬性，
並於 `script.js` 自動送出事件（支援 `gtag` 與 `dataLayer`）：

| 按鈕 | data-track |
| --- | --- |
| 查看活動優惠 / 查看優惠 | `offer_click` |
| 中壢廠／八德廠投票 / 投票抽獎 | `vote_click` |
| 洽詢 PLUS 會員資格 | `plus_click` |
| 立即預約回廠 | `booking_click` |

## 如何部署到 GitHub Pages

1. 建立 GitHub repository 並推送本專案：

   ```bash
   git init
   git add .
   git commit -m "Initial commit: MG service summer event landing page"
   git branch -M main
   git remote add origin https://github.com/<帳號>/mg-service-summer-event.git
   git push -u origin main
   ```

2. 進入 GitHub repo → **Settings → Pages**。
3. **Source** 選擇 `Deploy from a branch`，Branch 選 `main` / `(root)`，儲存。
4. 稍候數分鐘，即可透過
   `https://<帳號>.github.io/mg-service-summer-event/` 瀏覽。

> 因採相對路徑，置於子目錄（如 GitHub Pages 專案頁）亦可正常運作。

## 頁面區塊

1. Hero（主視覺、活動期間、雙 CTA）
2. 活動總覽（4 張卡片）
3. 免費 30 項冷氣健檢（icon grid）
4. 冷氣系統優惠（A／B／C 套餐）
5. 精選配件優惠
6. 滿額好禮
7. PLUS 會員專屬禮遇（深藍底）
8. 微笑大使票選
9. 服務據點（中壢廠／八德廠）
10. 注意事項
11. Footer + 手機 sticky 底部 CTA

## 已完成 / 待補資料

已完成：

- [x] 微笑大使投票表單（中壢廠、八德廠各一）
- [x] 預約回廠連結（MG 官網會員登入）
- [x] PLUS 會員洽詢 → LINE 官方帳號
- [x] 中壢廠、八德廠 地址與電話（含撥號連結、Google 地圖連結）
- [x] 導覽列 Logo 與 Footer 白色 Logo
- [x] Hero 主視覺、好禮照片

待補：

- [ ] 冷氣套餐圖片 `package-a/b/c.jpg`（目前缺圖會自動隱藏，卡片仍正常顯示文字）
- [ ] 精選配件圖片 `part-disc/pad/kyb/warranty.jpg`
- [ ] GA4 / GTM 追蹤碼
