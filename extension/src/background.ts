// Background service worker for PalPaxAI Extension

// Listen for extension install
chrome.runtime.onInstalled.addListener((details) => {
  try {
    if (details.reason === 'install') {
      console.log('PalPaxAI Extension installed');
      // Set default settings
      chrome.storage.local.set({
        walletConnected: false,
        walletAddress: '',
        notificationsEnabled: true,
      }).catch((error) => {
        console.error('Error setting default storage:', error);
      });
    }
  } catch (error) {
    console.error('Error in onInstalled listener:', error);
  }
});

// Listen for messages from popup/content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getWalletStatus') {
    chrome.storage.local.get(['walletConnected', 'walletAddress'], (result) => {
      sendResponse({
        connected: result.walletConnected || false,
        address: result.walletAddress || '',
      });
    });
    return true; // Keep channel open for async response
  }

  if (request.action === 'updateWalletStatus') {
    chrome.storage.local.set({
      walletConnected: request.connected || false,
      walletAddress: request.address || '',
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.action === 'clearWalletStatus') {
    chrome.storage.local.set({
      walletConnected: false,
      walletAddress: '',
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (request.action === 'openPalPaxAI') {
    chrome.tabs.create({ url: 'https://PalPaxAI.xyz' });
    sendResponse({ success: true });
  }

  if (request.action === 'openMarketplace') {
    chrome.tabs.create({ url: 'https://PalPaxAI.xyz/marketplace' });
    sendResponse({ success: true });
  }

  if (request.action === 'openPhantomInstall') {
    chrome.tabs.create({ url: 'https://phantom.app/' });
    sendResponse({ success: true });
  }

  return true;
});

// Periodic check for updates (optional)
// Only use alarms API if available and permission is granted
if (chrome.alarms && typeof chrome.alarms.create === 'function') {
  try {
    chrome.alarms.create('checkUpdates', { periodInMinutes: 60 }).catch((error) => {
      console.warn('Could not create alarm (may not have permission):', error);
    });

    chrome.alarms.onAlarm.addListener((alarm) => {
      try {
        if (alarm.name === 'checkUpdates') {
          // Could fetch latest stats or notifications here
          console.log('Checking for updates...');
        }
      } catch (error) {
        console.error('Error in alarm handler:', error);
      }
    });
  } catch (error) {
    console.warn('Alarms API error:', error);
  }
} else {
  console.log('Alarms API not available - skipping periodic updates');
}

