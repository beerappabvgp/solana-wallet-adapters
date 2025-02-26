"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SimpleDemo from "./components/Demo";
import { BalanceComponent } from "./components/BalanceComponent";

export default function Home() {
  const { publicKey } = useWallet();
  return (
    <div>
      <BalanceComponent />
    </div>
  );
}
