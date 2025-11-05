"use client";

import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// Import wallet adapters
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { TorusWalletAdapter } from "@solana/wallet-adapter-torus";
import "@solana/wallet-adapter-react-ui/styles.css";

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  // Use Mainnet for production
  const network = WalletAdapterNetwork.Mainnet;
  
  // Use mainnet endpoint
  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Mainnet) {
      // Using public mainnet RPC endpoint
      return "https://api.mainnet-beta.solana.com";
    }
    return clusterApiUrl(network);
  }, [network]);
  
  // Include all wallet adapters
  // Note: Phantom may register as Standard Wallet, but we include it explicitly for compatibility
  const wallets = useMemo(
    () => {
      const walletList = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
      ];
      
      
      return walletList;
    },
    []
  );

  // Error handler for wallet connection
  const onError = (error: Error) => {
    console.error("Wallet error:", error);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={onError}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

