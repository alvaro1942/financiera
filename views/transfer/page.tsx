import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, ChevronDown } from 'lucide-react';

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
    return (
        <div className="bg-[#19131f] text-slate-100 min-h-screen flex flex-col font-display max-w-2xl mx-auto w-full relative">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white mb-2 mt-4 text-center">Transferir Dinero</h1>
            </header>

            <main className="flex-1 px-4 py-6 flex flex-col gap-6">


                <div className="rounded-xl bg-[#271d30] border border-[#362843] p-5 shadow-lg flex flex-col gap-5">
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
                                type="text"
                                placeholder="0.00"
                                className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Beneficiario */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Beneficiario <span className="text-white">*</span></label>
                        <input
                            type="text"
                            placeholder="Juan Pérez García"
                            className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Banco y CLABE Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-white">Banco Destino <span className="text-white">*</span></label>
                            <div className="relative">
                                <select defaultValue="" className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all">
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
                                type="text"
                                placeholder="18 dígitos"
                                className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all font-mono text-sm"
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-white">Descripción</label>
                        <input
                            type="text"
                            placeholder="Concepto..."
                            className="w-full bg-[#362843]/50 border border-[#483759] rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9d4edd] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full mt-2 bg-[#8a2be2] hover:bg-[#9d4edd] text-white py-3.5 rounded-lg font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" />
                        Transferir
                    </button>
                </div>
            </main>
        </div>
    );
}
