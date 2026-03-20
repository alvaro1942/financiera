import Link from 'next/link';
import {
    ArrowLeft,
    QrCode,
    Copy,
    Home,
    History,
    CreditCard,
    User,
    Store,
    Building2,
    Wallet
} from 'lucide-react';

export default function DepositView() {
    return (
        <div className="bg-[#19131f] text-slate-100 min-h-screen flex flex-col font-display max-w-2xl mx-auto w-full relative">
            {/* Header */}
            <header>
                <h1 className="text-2xl font-bold text-white mb-2 mt-8 text-center">Fondear Cuenta</h1>
                <p className="text-slate-500 dark:text-slate-400 text-center mt-0.5 mb-6">Agrega fondos a tu balance mediante depósito o transferencia</p>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-8">

                {/* Depósito en Efectivo Section */}
                <section className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <Store className="w-5 h-5 text-[#c182fa]" />
                        <h2 className="text-xl font-bold">Depósito en Efectivo</h2>
                    </div>

                    <div className="rounded-xl bg-[#271d30] border border-[#362843] p-5 shadow-lg flex flex-col gap-6">

                        <div className="flex flex-col gap-4">
                            <h3 className="font-bold text-white text-lg">Instrucciones</h3>
                            <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                                <li>Acude a tu sucursal más cercana.</li>
                                <li>Muestra la imagen o dicta los números del código de barras al cajero.</li>
                                <li>Realiza el depósito en efectivo.</li>
                                <li>Da clic en "Ya deposité" para notificar tu pago.</li>
                            </ol>

                            <button className="w-full mt-2 bg-[#8a2be2] hover:bg-[#9d4edd] text-white py-3 rounded-lg font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                <Wallet className="w-5 h-5" />
                                Ya deposité
                            </button>
                        </div>

                        <div className="bg-[#19131f] p-4 rounded-xl flex items-center justify-center border border-[#362843]">
                            <div className="bg-white p-2 rounded-lg w-full max-w-[200px] aspect-square flex items-center justify-center overflow-hidden">
                                <img src="/qr2.png" alt="Código QR para depósito" className="w-full h-full object-contain" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* Transferencia SPEI Section */}
                <section className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <Building2 className="w-5 h-5 text-[#c182fa]" />
                        <h2 className="text-xl font-bold">Transferencia SPEI (CLABE)</h2>
                    </div>

                    <div className="rounded-xl bg-[#271d30] border border-[#362843] p-5 shadow-lg flex flex-col gap-5">
                        <p className="text-sm text-slate-300 leading-relaxed">
                            Transfiere desde la app de tu banco a la siguiente cuenta CLABE. Tu saldo se reflejará automáticamente una vez procesada la transferencia.
                        </p>

                        <div className="bg-[#19131f] border border-[#362843] rounded-xl p-4 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Clabe Interbancaria</span>
                                <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest">7289 6900 0097 9886 26</span>
                            </div>

                            <button className="w-full border border-[#483759] hover:bg-[#362843] text-white py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
                                <Copy className="w-4 h-4" />
                                Copiar CLABE
                            </button>
                        </div>
                    </div>
                </section>

            </main>

        </div>
    );
}
