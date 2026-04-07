"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { updateUserProfile, getUserTransactions } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import {
    Search,
    Bell,
    Nfc,
    Send,
    PlusCircle,
    Wallet,
    History,
    Home,
    ReceiptText,
    CreditCard,
    User,
    Landmark,
    X,
    Lock,
    Edit2,
    Save,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface UserProfile {
    id: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    curp: string;
    fechaNacimiento: Date;
    celular: string;
    direccion: string;
    correo: string;
    balance: number;
}

export default function DashboardView({ userProfile }: { userProfile: UserProfile }) {
    const [showCard, setShowCard] = useState(false);
    const [activeTab, setActiveTab] = useState<'inicio' | 'perfil'>('inicio');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const [transactions, setTransactions] = useState<any[]>([]);
    const [loadingTx, setLoadingTx] = useState(true);

    useEffect(() => {
        const fetchTx = async () => {
            setLoadingTx(true);
            const res = await getUserTransactions();
            console.log("Fetch tx result:", res);
            if (res?.success) {
                setTransactions(res.transactions || []);
            } else {
                console.error("Error fetching tx:", res?.error);
            }
            setLoadingTx(false);
        };
        fetchTx();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData(e.currentTarget);

        try {
            const result = await updateUserProfile(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                setSuccess(result.message || 'Perfil actualizado');
                setIsEditing(false);
                router.refresh(); // Refresh page to get updated data
            }
        } catch (err) {
            setError('Ocurrió un error inesperado. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex-1 flex flex-col justify-center items-center p-4 w-full">
            <div className="relative w-full flex flex-col max-w-md md:max-w-4xl mx-auto">
                {/* Top Header */}
                <header className="flex items-center bg-transparent p-1 justify-between mb-2">
                    <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
                        <Landmark className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-xl font-black leading-tight tracking-tight flex-1 px-3">CTFIN</h2>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6 gap-6 px-1">
                    <button
                        onClick={() => setActiveTab('inicio')}
                        className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'inicio' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                    >
                        Mi Cuenta
                    </button>
                    <button
                        onClick={() => setActiveTab('perfil')}
                        className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'perfil' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'}`}
                    >
                        <User className="w-4 h-4" />
                        Mi Perfil
                    </button>
                </div>

                {activeTab === 'inicio' && (
                    <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            {/* Greeting */}
                            <div className="w-full">
                                <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">¡Bienvenido, {userProfile.nombres}!</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Es un buen día para ahorrar.</p>
                            </div>

                            {/* Balance Card */}
                            <div>
                                <div className="relative overflow-hidden flex flex-col items-stretch justify-start rounded-xl p-4 shadow-xl bg-primary text-white">
                                    {/* Abstract Pattern Background */}
                                    <div
                                        className="absolute inset-0 opacity-20 pointer-events-none"
                                        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
                                    />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-primary-100 opacity-90 text-xs font-medium">Mi cuenta principal</p>
                                            <Nfc className="opacity-80 w-5 h-5" />
                                        </div>
                                        <h1 className="text-white text-3xl font-bold leading-none tracking-tight mb-4">
                                            ${(userProfile.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </h1>
                                        <div className="flex items-center justify-between">
                                            <p className="text-white/80 text-sm font-normal">Saldo disponible</p>
                                            <button
                                                onClick={() => setShowCard(true)}
                                                className="flex items-center justify-center rounded-lg h-9 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold transition-colors"
                                            >
                                                Mi Tarjeta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Right Column - Movements Section */}
                        <div className="flex flex-col gap-2 bg-white/5 dark:bg-background-dark/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 h-full">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Últimos Movimientos</h4>
                                <button className="text-primary text-xs font-semibold">Ver todo</button>
                            </div>
                            {/* Empty State & Transactions */}
                            {loadingTx ? (
                                <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex-1">
                                    <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                                </div>
                            ) : transactions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 px-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex-1">
                                    <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 text-slate-300">
                                        <History className="text-slate-400 w-6 h-6" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Aún no hay transacciones</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 overflow-y-auto w-full pr-1 max-h-[300px]">
                                    {transactions.map((tx: any) => {
                                        const isDeposit = tx.type === 'DEPOSIT';
                                        return (
                                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDeposit ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'}`}>
                                                        {isDeposit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                            {isDeposit ? 'Depósito (+)' : 'Retiro (-)'}
                                                        </span>
                                                        <span className="text-xs text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className={`text-sm font-bold tracking-tight ${isDeposit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                                                    {isDeposit ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </main>
                )}
            </div>

            {/* Virtual Card Modal */}
            {showCard && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-[420px] shadow-2xl overflow-hidden flex flex-col relative">
                        {/* Close button */}
                        <div className="flex justify-end p-2 absolute right-0 top-0 z-20">
                            <button
                                onClick={() => setShowCard(false)}
                                className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <div className="relative group">
                                <div className="w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-primary via-[#9d50bb] to-[#6e48aa] p-6 flex flex-col justify-between text-white">
                                    {/* Chip and Logo */}
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-9 bg-yellow-400/80 rounded-md flex items-center justify-center overflow-hidden">
                                            <div className="grid grid-cols-2 gap-px w-full h-full opacity-30">
                                                <div className="border border-black/20"></div>
                                                <div className="border border-black/20"></div>
                                                <div className="border border-black/20"></div>
                                                <div className="border border-black/20"></div>
                                            </div>
                                        </div>
                                        <div className="italic font-bold text-xl tracking-tighter opacity-90">CTFIN</div>
                                    </div>

                                    {/* Card Number */}
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[0.6rem] uppercase tracking-widest opacity-70">Número de tarjeta</p>
                                        <p className="text-lg sm:text-xl font-mono tracking-[0.15em] font-medium whitespace-nowrap">4217 4700 8316 7201</p>
                                    </div>

                                    {/* Footer Card Info */}
                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-8">
                                            <div className="flex flex-col">
                                                <p className="text-[0.6rem] uppercase tracking-widest opacity-70">Vence</p>
                                                <p className="text-sm font-medium">12/28</p>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-[0.6rem] uppercase tracking-widest opacity-70">CVV</p>
                                                <p className="text-sm font-medium">222</p>
                                            </div>
                                        </div>
                                        <div className="flex -space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                                            <div className="w-8 h-8 rounded-full bg-orange-400/80"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Message */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mt-2">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <p className="text-slate-600 dark:text-slate-400 text-sm font-normal text-center">
                                        Estos datos son solo para visualización.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Tab Section */}
            {activeTab === 'perfil' && (
                <main className="w-full flex flex-col pt-2 pb-12 items-center">
                    <div className="bg-white/5 dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-lg overflow-hidden flex flex-col relative">
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Datos Personales
                            </h3>
                            <div className="flex items-center gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-sm font-bold transition-colors shadow-sm"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Editar Datos
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setError('');
                                            setSuccess('');
                                        }}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-xl text-sm font-bold transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {error && (
                                <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl border border-red-200 dark:border-red-900/50">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium rounded-xl border border-green-200 dark:border-green-900/50">
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                    <p>{success}</p>
                                </div>
                            )}

                            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Nombres</label>
                                        <input
                                            name="nombres"
                                            defaultValue={userProfile.nombres}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Apellido Paterno</label>
                                        <input
                                            name="apellidoPaterno"
                                            defaultValue={userProfile.apellidoPaterno}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Apellido Materno</label>
                                        <input
                                            name="apellidoMaterno"
                                            defaultValue={userProfile.apellidoMaterno}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Fecha de Nacimiento</label>
                                        <input
                                            name="fechaNacimiento"
                                            type="date"
                                            defaultValue={new Date(userProfile.fechaNacimiento).toISOString().split('T')[0]}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50 [color-scheme:light] dark:[color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1 flex items-center justify-between">
                                            CURP
                                            <span className="text-[11px] text-slate-400 font-normal ml-2">(No modificable)</span>
                                        </label>
                                        <input
                                            defaultValue={userProfile.curp}
                                            disabled
                                            className="form-input flex w-full rounded-xl text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 h-11 px-4 text-sm font-medium opacity-70 uppercase cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1 flex items-center justify-between">
                                            Correo Electrónico
                                            <span className="text-[11px] text-slate-400 font-normal ml-2">(No modificable)</span>
                                        </label>
                                        <input
                                            defaultValue={userProfile.correo}
                                            disabled
                                            className="form-input flex w-full rounded-xl text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 h-11 px-4 text-sm font-medium opacity-70 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Número Celular</label>
                                        <input
                                            name="celular"
                                            type="tel"
                                            maxLength={10}
                                            defaultValue={userProfile.celular}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Dirección Completa</label>
                                        <textarea
                                            name="direccion"
                                            defaultValue={userProfile.direccion}
                                            disabled={!isEditing}
                                            className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 min-h-[100px] py-3 px-4 text-sm font-medium transition-all resize-y disabled:opacity-60 disabled:bg-slate-50 dark:disabled:bg-slate-900/50"
                                            required
                                        />
                                    </div>

                                    {isEditing && (
                                        <>
                                            <div className="md:col-span-2 pt-4 pb-1 mt-2 border-b border-slate-200 dark:border-slate-800">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                    <Lock className="w-4 h-4 text-primary" />
                                                    Cambiar Contraseña <span className="text-xs font-normal text-slate-500">(Opcional)</span>
                                                </h4>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Nueva Contraseña</label>
                                                <input
                                                    name="nuevaContrasena"
                                                    type="password"
                                                    placeholder="Dejar en blanco para no cambiar"
                                                    className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="text-slate-900 dark:text-slate-300 text-sm font-semibold ml-1">Confirmar Nueva Contraseña</label>
                                                <input
                                                    name="confirmarContrasena"
                                                    type="password"
                                                    placeholder="Dejar en blanco para no cambiar"
                                                    className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 px-4 text-sm font-medium transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="mt-4 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Guardando cambios...' : (
                                                <>
                                                    <Save className="w-5 h-5" />
                                                    Guardar Cambios
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}
