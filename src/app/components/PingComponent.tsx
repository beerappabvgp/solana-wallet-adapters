"use client";

// In this component , we need to send a transaction to the network to ping the program

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS =
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export const PingComponent = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const handlePing = async () => {
        if (!connection || !publicKey) {
            console.log("Wallet not connected or connection unavailable ... ");
            return;
        }
        const transaction = new Transaction();
        const instruction = new TransactionInstruction({
            keys: [
                {
                    pubkey: new PublicKey(PING_PROGRAM_DATA_ADDRESS),
                    isSigner: false,
                    isWritable: true,
                }
            ],
            programId: new PublicKey(PING_PROGRAM_ADDRESS),
        });
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction.add(instruction);
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = latestBlockhash.blockhash;
        try {
            const signature = await sendTransaction(transaction, connection);
            console.log("transaction completed ...", signature);
        } catch (error) {
            console.log("error in transaction ...", error);
        }
    }
    return (
        <div>
            <button onClick={handlePing} className="bg-blue-500 text-white p-2 rounded-md mx-auto">Ping</button>
        </div>
    );
}