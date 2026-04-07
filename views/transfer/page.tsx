"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, ChevronDown, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTransfer } from '@/app/actions/user';

const BANCOS = [
    "BBVA", "Santander", "Scotiabank", "HSBC", "Banamex", "Banorte",
    "Inbursa", "Azteca", "Autofin", "Barclays", "Consubanco", "Banregio",
    "Afirme", "Bajío", "Mifel", "Invex", "BanCoppel", "Bancrea",
    "Actinver", "Intercam", "Bansi", "CIBanco", "Banco Famsa",
    "Banco Ahorro Famsa", "Banco Multiva", "Banco Sabadell", "Klar",
    "Stori", "Nu México", "Hey Banco", "Ualá", "Spin by Oxxo",
    "Mercado Pago", "BBVA Wallet", "CoDi"
];

export default function TransferView() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Solo permite números y hasta 2 decimales
        if (val === '') {
            e.target.value = '';
            return;
        }
        const regex = /^\d*\.?\d{0,2}$/;
        if (!regex.test(val)) {
            e.preventDefault();
            // revert input visually by removing last typed char or blocking
        }
    };

    const handleAmountInput = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        const regex = /^\d*\.?\d{0,2}$/;
        if (!regex.test(val)) {
            e.currentTarget.value = val.slice(0, -1);
        }
    };

    const handleClabeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value.replace(/\D/g, ''); // solo números
        e.currentTarget.value = val.slice(0, 18);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData(e.currentTarget);
        const res = await createTransfer(formData);

        if (res?.success) {
            setSuccess(res.message || "Transferencia en proceso.");
            // Pequeña pausa para que el usuario vea el mensaje de éxito antes de redirigir
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } else {
            setError(res?.error || "Error al transferir.");
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#19131f] text-slate-100 min-h-screen flex flex-col font-display max-w-2xl mx-auto w-full relative">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white mb-2 mt-4 text-center">Transferir Dinero</h1>
            </header>

            <main className="flex-1 px-4 py-6 flex flex-col gap-6">

                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 text-sm font-semibold rounded-xl border border-red-900/50 shadow-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="flex-1">{error}</p>
                    </div>
                )}
                
                {success && (
                    <div className="flex items-center gap-2 p-4 bg-green-500/10 text-green-400 text-sm font-semibold rounded-xl border border-green-900/50 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <p className="flex-1">{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="rounded-xl bg-[#271d30] border border-[#362843] p-5 shadow-lg flex flex-col gap-5">
                    {/* Card Header */}
                    <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-center gap-2 text-white">
                            <ArrowRightLeft className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Nueva Transferencia</h3>
                        </div>
                        <p className="text-sm text-slate-300">Disponible: $0.00</p>
                    </div>

                    {/* Monto */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Monto <span className="text-white">*</span></label>
                        <div className="relative">
                            <input
                                name="amount"
                                type="text"
                                placeholder="0.00"
                                required
                                onInput={handleAmountInput}
                                className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Beneficiario */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Beneficiario <span className="text-white">*</span></label>
                        <input
                            name="beneficiario"
                            type="text"
                            required
                            placeholder="Juan Pérez García"
                            className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Banco y CLABE Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white">Banco Destino <span className="text-white">*</span></label>
                            <div className="relative">
                                <select name="banco" required defaultValue="" className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all">
                                    <option value="" disabled className="text-slate-400">Seleccionar</option>
                                    {BANCOS.map(banco => (
                                        <option key={banco} value={banco.toLowerCase()}>
                                            {banco}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white">CLABE <span className="text-white">*</span></label>
                            <input
                                name="clabe"
                                type="text"
                                placeholder="18 dígitos"
                                required
                                minLength={18}
                                maxLength={18}
                                onInput={handleClabeInput}
                                className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all font-mono text-sm"
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Descripción</label>
                        <input
                            name="descripcion"
                            type="text"
                            placeholder="Concepto..."
                            className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button disabled={loading} type="submit" className="w-full mt-2 bg-[#8a2be2] hover:bg-[#9d4edd] text-white py-3.5 rounded-lg font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ArrowRightLeft className="w-5 h-5" />}
                        {loading ? 'Procesando...' : 'Transferir'}
                    </button>
                </form>
            </main>
        </div>
    );
}
