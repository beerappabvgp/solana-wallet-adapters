import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { connect } from "http2";
import { useEffect, useState } from "react"

export const BalanceComponent = () => {
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    useEffect(() => {
        const updateBalance = async () => {
            if (!connection || !publicKey) {
                console.error("Wallet not connected or connection unavailable");
            }
            try {
                console.log("pub key:", publicKey);
                const accountInfo = await connection.getAccountInfo(publicKey!);
                if (accountInfo) {
                    setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
                } else {
                    throw new Error("Account not found ... ");  
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        }
        updateBalance();
    }, [connection, publicKey]);
    return (
        <div>
            <p>{publicKey ? `Balance: ${balance}` : ""}</p>
        </div>
    );

}