# Hướng Dẫn Test Chrome Extension

## Build Extension

Extension đã được build thành công! Các file đã được tạo trong thư mục `dist/`:
- `popup.js` - UI của extension
- `content.js` - Script chạy trên web pages
- `background.js` - Background service worker

## Cách Load Extension vào Chrome để Test

### Bước 1: Mở Chrome Extensions Page
1. Mở Google Chrome
2. Vào địa chỉ: `chrome://extensions/`
   - Hoặc: Menu (3 chấm) → Extensions → Manage extensions

### Bước 2: Bật Developer Mode
1. Ở góc trên bên phải, bật toggle **"Developer mode"**

### Bước 3: Load Extension
1. Click nút **"Load unpacked"**
2. Chọn thư mục: `C:\Payai_all\payai\extension`
   - **Lưu ý**: Chọn thư mục `extension`, KHÔNG phải `dist`
   - Chrome sẽ tự động đọc `manifest.json` từ thư mục này

### Bước 4: Kiểm Tra Extension
1. Sau khi load, bạn sẽ thấy extension "PalPaxAI" trong danh sách
2. Click vào icon extension trên thanh toolbar để mở popup
3. Test các tính năng:
   - **Home tab**: Xem SOL price, stats, featured agents
   - **Marketplace tab**: Browse agents, search, filter
   - **Dashboard tab**: Xem stats overview
   - **Services tab**: Xem services list
   - **Analytics tab**: Cần connect wallet để xem
   - **Contracts tab**: Xem contracts
   - **Clients tab**: Cần connect wallet để xem
   - **Chat tab**: Placeholder cho AI chat
   - **Wallet tab**: Connect/Disconnect wallet, xem balance
   - **Performance tab**: Xem PayAI x402 metrics
   - **Integrations tab**: Xem integrations
   - **Settings tab**: Settings options

## Test Wallet Connection

### Để test wallet connection:
1. Mở một tab với website (bất kỳ website nào)
2. Click vào extension icon
3. Chuyển sang tab **"Wallet"**
4. Click **"Connect Wallet"**
5. Extension sẽ gửi message đến content script để connect wallet từ trang web hiện tại
6. Nếu có Phantom wallet installed, nó sẽ prompt để connect

**Lưu ý**: 
- Wallet connection yêu cầu website phải có Solana wallet (như Phantom) đã được inject
- Để test đầy đủ, nên mở tab với website có tích hợp Solana wallet

## Troubleshooting

### Extension không hiển thị:
- Kiểm tra console errors: Click vào extension → "Errors" (nếu có)
- Đảm bảo `manifest.json` hợp lệ
- Reload extension: Click icon reload trên extensions page

### Build lại extension:
```bash
cd payai/extension
npm run build
```
Sau đó reload extension trên Chrome extensions page.

### Xem logs:
- **Popup logs**: Right-click extension icon → "Inspect popup" → Console tab
- **Background logs**: chrome://extensions/ → Extension → "Service worker" → Console
- **Content script logs**: Right-click page → Inspect → Console tab

## File Structure

```
payai/extension/
├── dist/              # Built files (generated)
│   ├── popup.js
│   ├── content.js
│   └── background.js
├── src/               # Source files
│   ├── popup.tsx
│   ├── content.ts
│   ├── background.ts
│   └── styles.css
├── icons/             # Extension icons
├── manifest.json      # Extension manifest
├── popup.html         # Popup HTML
└── package.json       # Dependencies
```

## Next Steps

Sau khi test xong, bạn có thể:
1. Đóng gói extension để upload lên Chrome Web Store:
   - Chrome sẽ tự động tạo `.crx` file khi bạn click "Pack extension"
   - Hoặc zip thư mục `extension` (bao gồm cả `dist/` và các file khác)

2. Publish lên Chrome Web Store:
   - Tạo developer account trên Chrome Web Store
   - Upload zip file
   - Điền thông tin mô tả, screenshots, etc.
   - Submit để review
