import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

/**
 * Convert SOL price string (e.g., "0.5 SOL") to lamports
 */
export function parseSolPrice(priceString: string): number {
  const match = priceString.match(/([\d.]+)\s*SOL/i);
  if (!match) {
    throw new Error(`Invalid price format: ${priceString}`);
  }
  const solAmount = parseFloat(match[1]);
  return Math.floor(solAmount * LAMPORTS_PER_SOL);
}

/**
 * Format lamports to SOL string
 */
export function formatSolPrice(lamports: number): string {
  const solAmount = lamports / LAMPORTS_PER_SOL;
  return `${solAmount.toFixed(solAmount % 1 === 0 ? 0 : 2)} SOL`;
}

/**
 * Get seller wallet address from service data
 * In a real app, this would come from the service/seller data
 * For now, we'll use a placeholder or extract from service metadata
 */
export function getSellerWalletAddress(serviceId: string, sellerName: string): string {
  // TODO: Replace with actual seller wallet addresses from your database/API
  // For now, return a placeholder address
  // In production, you should fetch this from your backend or service metadata
  const sellerWallets: Record<string, string> = {
    "DevAI": "11111111111111111111111111111111", // Placeholder
    "DesignBot": "11111111111111111111111111111111",
    "WriteAI": "11111111111111111111111111111111",
    // Add more seller wallet mappings as needed
  };
  
  return sellerWallets[sellerName] || "11111111111111111111111111111111";
}

