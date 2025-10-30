# Chrome Web Store Publish Checklist

## ✅ Extension Requirements (READY)

- [x] Manifest.json v3 compliant
- [x] All required icons (16x16, 32x32, 48x48, 128x128)
- [x] Service worker properly configured
- [x] No critical errors
- [x] Error handling implemented

## 📦 Package Preparation

1. **Create ZIP file with only necessary files:**
   ```
   extension.zip should contain:
   - manifest.json
   - popup.html
   - dist/ (background.js, content.js, popup.js)
   - icons/ (all PNG files)
   ```

2. **Do NOT include:**
   - node_modules/
   - src/ (source files)
   - package.json
   - webpack.config.js
   - .git/
   - README.md

## 🖼️ Store Listing Requirements

### Required Items:
1. **Screenshots:**
   - 1280x800 or 640x400 (at least 1, up to 5)
   - Show extension popup and features
   
2. **Promotional Images (Optional but recommended):**
   - Small promo tile: 440x280
   - Large promo tile: 920x680
   - Marquee promo tile: 1400x560

3. **Detailed Description:**
   - Short description (132 characters max)
   - Full description (up to 16,000 characters)

4. **Privacy Policy URL:**
   - Must be publicly accessible
   - Can be on GitHub Pages, your website, or any public URL

5. **Category:** Productivity or Shopping

6. **Language:** English (at minimum)

## 🔒 Privacy & Permissions

✅ **Privacy Policy:** Created in PRIVACY_POLICY.md
- Need to host this on a public URL (can use GitHub Pages)

✅ **Permissions Justification:**
- All permissions are clearly used and necessary
- Documented in privacy policy

## 📝 Store Listing Content

### Short Description (132 chars):
"Quick access to PayAI marketplace, wallet connection, and AI agent services"

### Full Description Example:
```
PayAI Extension - Your Gateway to AI Agent Marketplace

Access the PayAI AI Agent Marketplace directly from your browser. Connect your Solana wallet and browse thousands of AI agents ready to help with development, design, writing, analytics, and more.

KEY FEATURES:
✨ Browse AI Agents Marketplace
🔗 Quick Wallet Connection
📊 Real-time SOL Price Tracking
🚀 Fast Access to PayAI Services
⚡ Instant Agent Search & Discovery

Perfect for developers, designers, and anyone looking to leverage AI agents for their projects. Transactions secured on Solana blockchain.

Privacy-focused: All wallet data stored locally. No tracking, no ads.
```

## 🚀 Publishing Steps

1. **Prepare Package:**
   ```bash
   # Navigate to extension folder
   cd extension
   
   # Create ZIP (exclude unnecessary files)
   # Use the create-package script or manually zip:
   # - manifest.json
   # - popup.html
   # - dist/
   # - icons/
   ```

2. **Chrome Web Store Developer Dashboard:**
   - Go to: https://chrome.google.com/webstore/devconsole
   - Pay one-time $5 registration fee (if first time)
   - Click "New Item"
   - Upload ZIP file
   - Fill in store listing

3. **Review Process:**
   - Usually takes 1-3 business days
   - Google reviews for policy compliance
   - May request clarifications

## ⚠️ Important Notes

- **Host Permissions:** Extension requests access to `https://*.payai.xyz/*` - make sure this is justified in description
- **Privacy Policy:** MUST be publicly accessible URL, not just a file
- **Screenshots:** you can take screenshots of the extension popup
- **Testing:** Test extension in Chrome before submitting

## 🎯 Next Steps

1. Create ZIP package (excluding source files)
2. Take screenshots of extension
3. Host privacy policy on public URL (GitHub Pages recommended)
4. Submit to Chrome Web Store
5. Wait for review

---

**Note:** Website (payai.xyz) does NOT need to be live before publishing extension, but it's recommended for better user experience.

