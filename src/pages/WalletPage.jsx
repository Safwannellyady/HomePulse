import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Wallet, CreditCard, History, ArrowUpRight, Zap, Download } from 'lucide-react';
import Modal from '../components/common/Modal';

const WalletPage = () => {
    const { user, updateWallet } = useAuth();
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [amount, setAmount] = useState(500);

    const handleTopUp = (e) => {
        e.preventDefault();
        updateWallet(parseFloat(amount));
        setIsTopUpOpen(false);
    };

    const transactions = [
        { id: 1, type: 'Debit', desc: 'Electricity Bill - Nov', amount: 1450, date: '2025-11-05', status: 'Success' },
        { id: 2, type: 'Credit', desc: 'Wallet Top-up', amount: 2000, date: '2025-11-04', status: 'Success' },
        { id: 3, type: 'Debit', desc: 'Auto-Pay: BESCOM', amount: 1320, date: '2025-10-05', status: 'Success' },
    ];

    return (
        <div className="animate-fade-in-up space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">My Wallet</h2>
                <p className="text-gray-400">Manage payments, top-ups, and billing history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-neon-blue/20 to-purple-600/20 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Wallet className="w-40 h-40 transform rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <p className="text-gray-400 mb-1">Total Balance</p>
                        <h1 className="text-5xl font-bold text-white mb-6">₹{user?.walletBalance?.toFixed(2)}</h1>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsTopUpOpen(true)}
                                className="px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                                Top Up
                            </button>
                            <button className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors border border-white/10">
                                <Zap className="w-5 h-5" />
                                Pay Bill
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Bill Status */}
                <div className="bg-glass-surface rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Current Bill</h3>
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                            <p className="text-xs text-red-300 uppercase font-bold mb-1">Due in 5 Days</p>
                            <p className="text-2xl font-bold text-white">₹0.00</p>
                            <p className="text-xs text-gray-400">Bill Cleared! 🎉</p>
                        </div>
                    </div>
                    <button className="w-full py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Invoice
                    </button>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-glass-surface rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <History className="w-5 h-5 text-gray-400" />
                        Transaction History
                    </h3>
                </div>
                <div className="divide-y divide-white/5">
                    {transactions.map(tx => (
                        <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${tx.type === 'Credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {tx.type === 'Credit' ? <ArrowUpRight className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{tx.desc}</p>
                                    <p className="text-xs text-gray-500">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.type === 'Credit' ? 'text-green-400' : 'text-white'}`}>
                                    {tx.type === 'Credit' ? '+' : '-'}₹{tx.amount}
                                </p>
                                <p className="text-xs text-green-500 bg-green-500/10 px-2 rounded inline-block">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Up Modal */}
            <Modal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} title="Add Money to Wallet">
                <form onSubmit={handleTopUp} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Enter Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-xl text-gray-400 font-bold">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-2xl font-bold text-white focus:border-neon-blue outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[100, 500, 1000].map(val => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setAmount(val)}
                                className="py-2 rounded-lg border border-white/10 text-sm hover:bg-white/10 text-gray-300"
                            >
                                +₹{val}
                            </button>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-neon-blue text-black font-bold hover:shadow-[0_0_20px_#00f3ff] transition-all"
                    >
                        Proceed to Pay
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default WalletPage;
