// Content script - runs on all web pages

// Inject a bridge script to allow page scripts to communicate with extension
function injectBridge() {
  // Check if already injected
  if (document.getElementById('__PalPaxAI_extension_bridge')) return;
  
  // Inject script into page context (not content script context)
  const script = document.createElement('script');
  script.id = '__PalPaxAI_extension_bridge';
  script.textContent = `
    (function() {
      if (window.__PalPaxAIExtensionBridge) {
        console.log('PalPaxAI Extension: Bridge already exists');
        return;
      }
      
      window.__PalPaxAIExtensionBridge = {
        syncWalletState: function(connected, address) {
          console.log('PalPaxAI Extension Bridge: syncWalletState called', { connected, address });
          window.postMessage({
            type: '__PalPaxAI_EXTENSION_SYNC_WALLET',
            connected: connected,
            address: address
          }, '*');
        }
      };
      console.log('PalPaxAI Extension: Bridge injected successfully');
    })();
  `;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

// Inject immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectBridge);
} else {
  injectBridge();
}

// Also inject after a short delay to catch dynamic page loads
setTimeout(injectBridge, 1000);

// Listen for messages from injected bridge script
window.addEventListener('message', (event) => {
  // Only accept messages from same window
  if (event.source !== window) return;
  
  if (event.data && event.data.type === '__PalPaxAI_EXTENSION_SYNC_WALLET') {
    console.log('PalPaxAI Extension Content Script: Received wallet sync', event.data);
    chrome.storage.local.set({
      walletConnected: event.data.connected || false,
      walletAddress: event.data.address || '',
    }, () => {
      console.log('PalPaxAI Extension: Wallet state synced to storage', {
        connected: event.data.connected,
        address: event.data.address
      });
    });
  }
});

// Inject PalPaxAI quick access button on non-PalPaxAI pages
if (!window.location.hostname.includes('PalPaxAI.xyz')) {
  // Could add a floating button or notification here
  // For now, just console log for debugging
  console.log('PalPaxAI Extension: Content script loaded');
}

// Listen for messages from popup AND from page scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'injectQuickAccess') {
    // Could inject a quick access widget here
    sendResponse({ success: true });
  }
  
  if (request.action === 'detectWallet') {
    // Detect wallet in page context
    const solana = (window as any).solana;
    let walletInfo: {
      name: string;
      url: string;
      isPhantom?: boolean;
      isBackpack?: boolean;
      isSolflare?: boolean;
      isConnected?: boolean;
      publicKey?: string;
    } | null = null;
    
    if (solana) {
      if (solana.isPhantom) {
        walletInfo = { name: 'Phantom', isPhantom: true, url: 'https://phantom.app/' };
      } else if (solana.isBackpack) {
        walletInfo = { name: 'Backpack', isBackpack: true, url: 'https://www.backpack.app/' };
      } else if (solana.isSolflare) {
        walletInfo = { name: 'Solflare', isSolflare: true, url: 'https://solflare.com/' };
      } else if (solana.connect || solana.isConnected !== undefined) {
        walletInfo = { name: 'Solana Wallet', url: 'https://phantom.app/' };
      }
      
      if (walletInfo) {
        walletInfo.isConnected = solana.isConnected || (solana.publicKey !== null && solana.publicKey !== undefined);
        walletInfo.publicKey = solana.publicKey?.toString();
      }
    }
    
    sendResponse({ 
      wallet: walletInfo,
      hasSolana: !!solana 
    });
    return true; // Keep channel open for async
  }
  
  if (request.action === 'connectWallet') {
    // Connect wallet in page context
    const solana = (window as any).solana;
    if (!solana) {
      sendResponse({ error: 'No wallet found' });
      return true;
    }
    
    solana.connect({ onlyIfTrusted: false })
      .then((resp: any) => {
        sendResponse({ 
          success: true,
          publicKey: resp?.publicKey?.toString() || solana.publicKey?.toString()
        });
      })
      .catch((err: any) => {
        sendResponse({ 
          error: err.message || 'Connection failed',
          code: err.code
        });
      });
    return true; // Keep channel open for async
  }
  
  if (request.action === 'disconnectWallet') {
    const solana = (window as any).solana;
    if (solana && solana.disconnect) {
      solana.disconnect()
        .then(() => sendResponse({ success: true }))
        .catch((err: any) => sendResponse({ error: err.message }));
    } else {
      sendResponse({ success: true }); // Already disconnected
    }
    return true;
  }
  
  return true;
});


