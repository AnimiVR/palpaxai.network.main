"use client";

import { useState, useCallback } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { 
  PublicKey, 
  Transaction, 
  SystemProgram
} from "@solana/web3.js";
import { parseSolPrice, getSellerWalletAddress } from "@/lib/payment";

// Dynamic imports for Faremeter packages (in case they're ESM only)
// Note: Faremeter packages are temporarily disabled
type FaremeterModule = {
  createPayment?: (params: {
    amount: number;
    recipient: string;
    serviceId: string;
    metadata: Record<string, string>;
  }) => Promise<{ transaction?: Transaction; signature?: string }>;
} | null;

const faremeterPayment: FaremeterModule = null;
const faremeterFetch: FaremeterModule = null;
const faremeterInfo: FaremeterModule = null;

async function loadFaremeterModules(): Promise<{
  faremeterPayment: FaremeterModule;
  faremeterFetch: FaremeterModule;
  faremeterInfo: FaremeterModule;
}> {
  // Faremeter packages are temporarily disabled - always use direct Solana transactions
  // if (!faremeterPayment) {
  //   try {
  //     faremeterPayment = await import("@faremeter/payment-solana");
  //     faremeterFetch = await import("@faremeter/fetch");
  //     faremeterInfo = await import("@faremeter/info");
  //   } catch (error) {
  //     console.warn("Faremeter modules not available, will use direct Solana transaction:", error);
  //   }
  // }
  return { faremeterPayment, faremeterFetch, faremeterInfo };
}

interface PaymentResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export function useFaremeterPayment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();

  const processPayment = useCallback(async (
    serviceId: string,
    serviceTitle: string,
    priceString: string,
    sellerName: string,
    sellerWalletAddress?: string
  ): Promise<PaymentResult> => {
    if (!publicKey) {
      return {
        success: false,
        error: "Wallet not connected. Please connect your wallet first.",
      };
    }

    if (!connection) {
      return {
        success: false,
        error: "Connection not available. Please try again.",
      };
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Parse price first to validate input
      let lamports: number;
      try {
        lamports = parseSolPrice(priceString);
      } catch (parseError: unknown) {
        const errorMessage = parseError instanceof Error ? parseError.message : "Invalid format";
        throw new Error(`Invalid price format: ${priceString}. ${errorMessage}`);
      }

      // Get seller wallet address
      let recipientPubkey: PublicKey;
      try {
        const recipientAddress = sellerWalletAddress || getSellerWalletAddress(serviceId, sellerName);
        recipientPubkey = new PublicKey(recipientAddress);
      } catch (pubkeyError: unknown) {
        const errorMessage = pubkeyError instanceof Error ? pubkeyError.message : "Invalid address";
        throw new Error(`Invalid seller wallet address. ${errorMessage}`);
      }

      // Try to load Faremeter modules (non-blocking)
      const faremeterModules = await loadFaremeterModules();

      // Option 1: Try using Faremeter payment SDK if available
      if (faremeterModules.faremeterPayment && faremeterModules.faremeterPayment.createPayment) {
        try {
          const paymentResult = await faremeterModules.faremeterPayment.createPayment({
            amount: lamports,
            recipient: recipientPubkey.toString(),
            serviceId,
            metadata: {
              serviceTitle,
              sellerName,
            },
          });

          // If Faremeter returns a transaction, sign and send it
          if (paymentResult.transaction && signTransaction) {
            const signedTx = await signTransaction(paymentResult.transaction);
            const signature = await connection.sendRawTransaction(signedTx.serialize());
            await connection.confirmTransaction(signature, "confirmed");

            setIsProcessing(false);
            return {
              success: true,
              signature,
            };
          } else if (paymentResult.signature) {
            // If Faremeter already processed the transaction
            setIsProcessing(false);
            return {
              success: true,
              signature: paymentResult.signature,
            };
          }
        } catch (faremeterError: unknown) {
          console.warn("Faremeter payment SDK error, falling back to direct Solana transaction:", faremeterError);
          // Continue to fallback method
        }
      }

      // Option 2: Fallback to direct Solana transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      // Get recent blockhash
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      let signature: string;
      
      if (sendTransaction) {
        // Use wallet adapter's sendTransaction (recommended)
        signature = await sendTransaction(transaction, connection, {
          skipPreflight: false,
        });

        // Wait for confirmation
        await connection.confirmTransaction(
          {
            signature,
            blockhash,
            lastValidBlockHeight,
          },
          "confirmed"
        );
      } else if (signTransaction) {
        // Fallback to sign and send manually
        const signed = await signTransaction(transaction);
        signature = await connection.sendRawTransaction(signed.serialize(), {
          skipPreflight: false,
        });

        await connection.confirmTransaction(signature, "confirmed");
      } else {
        throw new Error("Wallet does not support sending transactions");
      }

      setIsProcessing(false);
      return {
        success: true,
        signature,
      };
    } catch (err: unknown) {
      console.error("Payment error:", err);
      
      // Provide user-friendly error messages
      let errorMessage = "Payment failed. Please try again.";
      
      if (err instanceof Error) {
        if (err.name === "UserRejectedRequestError") {
          errorMessage = "Transaction was cancelled by user.";
        } else if (err.message.includes("insufficient funds")) {
          errorMessage = "Insufficient funds in your wallet. Please add more SOL.";
        } else if (err.message.includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (err.message) {
          errorMessage = err.message;
        }
      } else if (typeof err === "object" && err !== null && "code" in err && err.code === 4001) {
        errorMessage = "Transaction was rejected. Please try again.";
      }
      
      setError(errorMessage);
      setIsProcessing(false);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }, [publicKey, connection, sendTransaction, signTransaction]);

  return {
    processPayment,
    isProcessing,
    error,
  };
}

