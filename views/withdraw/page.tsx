"use client";

import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';

export default function WithdrawView() {
    const [showModal, setShowModal] = useState(false);
    const [codes, setCodes] = useState<string[]>([]);
    const [amount, setAmount] = useState('');

    const handleWithdraw = () => {
        if (!amount) return;

        // Generate 4 random 4-digit codes
        const newCodes = Array.from({ length: 4 }, () =>
            Math.floor(1000 + Math.random() * 9000).toString()
        );

        setCodes(newCodes);
        setShowModal(true);
    };

    return (
        <div className="bg-[#19131f] text-slate-100 min-h-screen flex flex-col font-display max-w-2xl mx-auto w-full relative">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white mb-2 mt-8 text-center">Retirar Dinero</h1>
            </header>

            <main className="flex-1 px-4 py-8 flex items-start justify-center">
                <div className="w-full rounded-2xl bg-[#211a28] border border-[#2d2235] p-6 shadow-xl flex flex-col gap-5">

                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Monto a retirar"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-[#362843] border border-[#7a2bbf] rounded-xl px-4 py-4 text-center text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                        />
                    </div>

                    <button
                        onClick={handleWithdraw}
                        className="w-full bg-[#8a2be2] hover:bg-[#9d4edd] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        Realizar Retiro
                    </button>

                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#19131f] border border-[#271d30] rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden flex flex-col">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 pb-2">
                            <h2 className="text-xl font-bold text-center flex-1 text-white pr-2 pl-8">Códigos de Retiro</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 pt-4 flex flex-col items-center gap-6">

                            {/* Codes Grid */}
                            <div className="flex flex-col gap-3 w-full">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-[#211a28] border border-[#2d2235] rounded-xl py-3 flex items-center justify-center text-lg font-mono font-bold tracking-widest text-white">
                                        {codes[0]}
                                    </div>
                                    <div className="bg-[#211a28] border border-[#2d2235] rounded-xl py-3 flex items-center justify-center text-lg font-mono font-bold tracking-widest text-white">
                                        {codes[1]}
                                    </div>
                                    <div className="bg-[#211a28] border border-[#2d2235] rounded-xl py-3 flex items-center justify-center text-lg font-mono font-bold tracking-widest text-white">
                                        {codes[2]}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 px-[16.666%]">
                                    <div className="bg-[#211a28] border border-[#2d2235] rounded-xl py-3 flex items-center justify-center text-lg font-mono font-bold tracking-widest text-white">
                                        {codes[3]}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-[auto_1fr] gap-3 w-full w-full">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 rounded-xl font-bold bg-[#19131f] border border-[#8a2be2] text-white hover:bg-[#8a2be2]/10 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-[#8a2be2] hover:bg-[#9d4edd] text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all"
                                >
                                    Realizar Retiro
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
