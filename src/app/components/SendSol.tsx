import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SendTransactionError, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

export const SendSol = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState("");
    const [signature, setSignature] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!connection || !publicKey) {
            console.log("Wallet not found ... ");
            return;
        }
        try {
            const transaction = new Transaction();
            const instruction = SystemProgram.transfer({
                fromPubkey: publicKey!,
                toPubkey: new PublicKey(recipient),
                lamports: amount * LAMPORTS_PER_SOL,
            });
            transaction.add(instruction);
            const signature = await sendTransaction(transaction, connection);
            console.log("signature is : ", signature);
            setSignature(signature);
        } catch (error) {
            console.log("Error sending SOL:", error);
            setSignature(null);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-black">Send SOL</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1">Recipient</label>
                    <input
                        type="text"
                        placeholder="Enter recipient address"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-black focus:border-transparent outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-black mb-1">Amount</label>
                    <input
                        type="text"
                        placeholder="Enter SOL amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 text-black focus:border-transparent outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                    Send SOL
                </button>
            </form>
            {signature && (
                <div className="mt-4 text-sm">
                    <p className="text-gray-700">Transaction successful!</p>
                    <a
                        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 break-all"
                    >
                        View transaction: {signature}
                    </a>
                </div>
            )}
        </div>
    );
}