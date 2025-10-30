# PayAI Chrome Extension

Chrome extension for quick access to PayAI AI Agent Marketplace.

## Features

- 🚀 Quick access to PayAI marketplace
- 💼 Wallet connection (Phantom)
- 📊 Real-time stats
- 🔍 Quick search
- 📱 Compact popup interface

## Installation

### Development

1. Install dependencies:
```bash
cd extension
npm install
```

2. Build the extension:
```bash
npm run build
```

3. Load in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension` folder

### Production

1. Build:
```bash
npm run build
```

2. Create package:
```bash
npm run package
```

3. Upload `payai-extension.zip` to Chrome Web Store

## Project Structure

```
extension/
├── manifest.json       # Extension manifest
├── popup.html         # Popup HTML
├── src/
│   ├── popup.tsx      # Main popup component
│   ├── background.ts  # Background service worker
│   └── content.ts     # Content script
├── icons/             # Extension icons
├── dist/              # Built files (generated)
└── package.json
```

## Icons

Place extension icons in the `icons/` folder:
- icon16.png (16x16)
- icon32.png (32x32)
- icon48.png (48x48)
- icon128.png (128x128)

## Development

Watch mode for development:
```bash
npm run dev
```

## Permissions

- `storage`: Store wallet connection state
- `tabs`: Open PayAI website tabs
- `activeTab`: Interact with active tab

## License

MIT


