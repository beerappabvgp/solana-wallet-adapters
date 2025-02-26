"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletModalProviderComponent = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then(mod => mod.WalletModalProvider),
  { ssr: false }
);

const WalletMultiButtonComponent = dynamic(() => import("@solana/wallet-adapter-react-ui").then(mod => mod.WalletMultiButton), { ssr: false});

export const Connection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProviderComponent>
            <WalletMultiButtonComponent />
            {children}
          </WalletModalProviderComponent>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};
