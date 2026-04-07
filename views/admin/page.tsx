"use client";

import { useEffect, useState } from "react";
import { Users, FileText, Landmark, Search, PlusCircle, MinusCircle, CheckCircle2, AlertCircle, RefreshCw, X, Trash2, Lock, Unlock } from "lucide-react";
import { getAllUsers, getAllAccountsTransactions, fundAccount, deleteUser, toggleUserStatus, getPendingTransfers, resolveTransfer } from "@/app/actions/admin";

export default function AdminView() {
    const [activeTab, setActiveTab] = useState<'usuarios' | 'tramites' | 'aprobaciones'>('usuarios');
    const [users, setUsers] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [pendingTransfers, setPendingTransfers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Funding state
    const [fundingAmount, setFundingAmount] = useState<{[key: string]: string}>({});
    const [fundingLoader, setFundingLoader] = useState<string | null>(null);
    const [actionLoader, setActionLoader] = useState<string | null>(null);

    const loadData = async () => {
        setLoading(true);
        setError("");
        
        try {
            if (activeTab === 'usuarios') {
                const res = await getAllUsers();
                if (res?.success) setUsers(res.users);
                else setError(res?.error || "Error cargando usuarios.");
            } else if (activeTab === 'tramites') {
                const res = await getAllAccountsTransactions();
                if (res?.success) setAccounts(res.accounts);
                else setError(res?.error || "Error cargando trámites.");
            } else {
                const res = await getPendingTransfers();
                if (res?.success) setPendingTransfers(res.transfers || []);
                else setError(res?.error || "Error cargando aprobaciones.");
            }
        } catch (err) {
            setError("Ocurrió un error inesperado al conectar con la base de datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const handleFundUser = async (userId: string, action: 'add' | 'subtract') => {
        const amtStr = fundingAmount[userId];
        let amt = parseFloat(amtStr);
        if (isNaN(amt) || amt <= 0) {
            setError("Ingresa un monto válido.");
            return;
        }

        if (action === 'subtract') {
            amt = -Math.abs(amt);
        }

        setFundingLoader(userId);
        setError("");
        setSuccess("");
        
        const res = await fundAccount(userId, amt);
        if (res?.success) {
            setSuccess(res.message);
            setFundingAmount(prev => ({...prev, [userId]: ""}));
            loadData(); // Re-fetch to see new balance
        } else {
            setError(res?.error || "Ocurrió un error al intentar fondear.");
        }
        
        setFundingLoader(null);
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar definitivamente a este usuario?\n\nEsta acción no se puede deshacer y eliminará todas sus cuentas y transacciones.")) return;
        
        setActionLoader(userId + '-delete');
        setError("");
        setSuccess("");
        
        const res = await deleteUser(userId);
        if (res?.success) {
            setSuccess(res.message);
            loadData();
        } else {
            setError(res?.error || "Ocurrió un error al eliminar el usuario.");
        }
        setActionLoader(null);
    };

    const handleToggleUser = async (userId: string) => {
        setActionLoader(userId + '-toggle');
        setError("");
        setSuccess("");
        
        const res = await toggleUserStatus(userId);
        if (res?.success) {
            setSuccess(res.message);
            loadData();
        } else {
            setError(res?.error || "Ocurrió un error al cambiar estado del usuario.");
        }
        setActionLoader(null);
    };

    const handleResolveTransfer = async (txId: string, action: 'APPROVE' | 'REJECT') => {
        setActionLoader(txId + '-' + action);
        setError("");
        setSuccess("");
        
        const res = await resolveTransfer(txId, action);
        if (res?.success) {
            setSuccess(res.message);
            loadData();
        } else {
            setError(res?.error || "Error al resolver la transferencia.");
        }
        setActionLoader(null);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col p-4 md:p-8 w-full min-h-screen">
            <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
                
                {/* Header Admin */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 dark:bg-slate-900/40 p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(135deg, #7a2bbf 0%, #3b0066 100%)' }} />
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-primary/20 text-primary-200 rounded-xl p-3 flex items-center justify-center">
                            <Landmark className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-white text-2xl font-black tracking-tight">Panel de Administrador</h2>
                            <p className="text-slate-400 text-sm font-medium">Control total sobre usuarios y saldos</p>
                        </div>
                    </div>
                </header>

                {/* Status Messages */}
                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl border border-red-200 dark:border-red-900/50 shadow-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="flex-1">{error}</p>
                        <button onClick={() => setError("")} className="hover:opacity-70"><X className="w-4 h-4" /></button>
                    </div>
                )}
                
                {success && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-xl border border-green-200 dark:border-green-900/50 shadow-sm">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                        <p className="flex-1">{success}</p>
                        <button onClick={() => setSuccess("")} className="hover:opacity-70"><X className="w-4 h-4" /></button>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 mt-2">
                    <button 
                        onClick={() => setActiveTab('usuarios')}
                        className={`flex items-center gap-2 pb-3 px-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'usuarios' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                        <Users className="w-4 h-4" />
                        Usuarios Registrados
                    </button>
                    <button 
                        onClick={() => setActiveTab('tramites')}
                        className={`flex items-center gap-2 pb-3 px-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'tramites' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                        <FileText className="w-4 h-4" />
                        Trámites
                    </button>
                    <button 
                        onClick={() => setActiveTab('aprobaciones')}
                        className={`flex items-center gap-2 pb-3 px-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'aprobaciones' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 opacity-60 hover:opacity-100'}`}
                    >
                        <AlertCircle className="w-4 h-4" />
                        Aprobaciones
                        {pendingTransfers.length > 0 && activeTab !== 'aprobaciones' && (
                            <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">{pendingTransfers.length}</span>
                        )}
                    </button>
                </div>

                {/* Content Area */}
                <main className="w-full bg-white dark:bg-background-dark/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[400px]">
                    
                    {/* Header Controls */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input 
                                placeholder={activeTab === 'usuarios' ? "Buscar usuario..." : (activeTab === 'tramites' ? "Buscar trámite..." : "Buscar aprobación...")} 
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 rounded-xl text-sm outline-none focus:border-primary/50 transition-colors dark:text-white"
                            />
                        </div>
                        <button 
                            onClick={loadData}
                            disabled={loading}
                            className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2 text-sm font-semibold"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Actualizar</span>
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto w-full flex-1">
                        {loading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center min-h-[300px] text-slate-400 gap-3">
                                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                                <span className="text-sm font-medium">Cargando datos...</span>
                            </div>
                        ) : activeTab === 'usuarios' ? (
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <th className="font-semibold p-4">ID / Registro</th>
                                        <th className="font-semibold p-4">Nombre Completo</th>
                                        <th className="font-semibold p-4">Contacto</th>
                                        <th className="font-semibold p-4">CURP</th>
                                        <th className="font-semibold p-4">Estado</th>
                                        <th className="font-semibold p-4 text-right">Saldo Actual</th>
                                        <th className="font-semibold p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="p-4 align-top">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-slate-400 font-mono" title={user.id}>{user.id.split("-")[0]}...</span>
                                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {user.nombres} {user.apellidoPaterno} {user.apellidoMaterno}
                                                    </span>
                                                    <span className="text-xs text-slate-500 mt-0.5 max-w-[200px] truncate" title={user.direccion}>
                                                        {user.direccion}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="flex flex-col gap-1">
                                                    <a href={`mailto:${user.correo}`} className="text-sm font-medium text-primary hover:underline">{user.correo}</a>
                                                    <span className="text-xs text-slate-500">{user.celular}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-mono font-bold uppercase text-slate-700 dark:text-slate-300">
                                                    {user.curp}
                                                </span>
                                            </td>
                                            <td className="p-4 align-top">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                    {user.isActive ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="p-4 align-top text-right">
                                                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                                                    ${(user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                            <td className="p-4 align-top text-center w-24">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button 
                                                        onClick={() => handleToggleUser(user.id)}
                                                        disabled={actionLoader !== null}
                                                        className={`p-2 rounded-lg transition-colors ${user.isActive ? 'text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/20' : 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20'} disabled:opacity-50`}
                                                        title={user.isActive ? "Desactivar" : "Activar"}
                                                    >
                                                        {actionLoader === user.id + '-toggle' ? <RefreshCw className="w-5 h-5 animate-spin" /> : (user.isActive ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />)}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        disabled={actionLoader !== null}
                                                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Eliminar"
                                                    >
                                                        {actionLoader === user.id + '-delete' ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                                                No hay usuarios registrados.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : activeTab === 'tramites' ? (
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <th className="font-semibold p-4 w-[30%]">Usuario</th>
                                        <th className="font-semibold p-4 text-center w-[25%]">Saldo Actual</th>
                                        <th className="font-semibold p-4 w-[45%]">Acciones (Fondear)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((acc) => (
                                        <tr key={acc.userId} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {acc.nombres} {acc.apellidoPaterno}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{acc.correo}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="inline-block px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
                                                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                                        ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                                        <input 
                                                            type="number"
                                                            placeholder="0.00"
                                                            value={fundingAmount[acc.userId] || ""}
                                                            onChange={(e) => setFundingAmount(prev => ({...prev, [acc.userId]: e.target.value}))}
                                                            className="pl-8 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 rounded-xl text-sm font-bold w-32 outline-none focus:border-primary/50 transition-colors"
                                                            min="1"
                                                            step="any"
                                                        />
                                                    </div>
                                                    <button 
                                                        onClick={() => handleFundUser(acc.userId, 'add')}
                                                        disabled={fundingLoader === acc.userId || !fundingAmount[acc.userId]}
                                                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold h-10 px-4 rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-50 text-sm"
                                                    >
                                                        {fundingLoader === acc.userId ? (
                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <PlusCircle className="w-4 h-4" />
                                                                Sumar
                                                            </>
                                                        )}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleFundUser(acc.userId, 'subtract')}
                                                        disabled={fundingLoader === acc.userId || !fundingAmount[acc.userId]}
                                                        className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold h-10 px-4 rounded-xl transition-all shadow-md shadow-slate-900/20 disabled:opacity-50 text-sm"
                                                    >
                                                        {fundingLoader === acc.userId ? (
                                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                <MinusCircle className="w-4 h-4" />
                                                                Restar
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {accounts.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-slate-500 text-sm">
                                                Aún no hay usuarios.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        <th className="font-semibold p-4">Solicitante</th>
                                        <th className="font-semibold p-4">Destino</th>
                                        <th className="font-semibold p-4 text-right">Monto</th>
                                        <th className="font-semibold p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingTransfers.map((tx) => (
                                        <tr key={tx.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                            <td className="p-4 align-top">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                        {tx.user?.nombres} {tx.user?.apellidoPaterno}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{tx.user?.correo}</span>
                                                    <span className="text-xs text-slate-400 mt-1">{new Date(tx.createdAt).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-top">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white uppercase">{tx.destinationBank}</span>
                                                    <span className="text-xs text-slate-500">{tx.destinationName}</span>
                                                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded w-fit text-slate-600 dark:text-slate-300">CLABE: {tx.destinationClabe}</span>
                                                    {tx.description && <span className="text-xs italic text-slate-500 mt-1">"{tx.description}"</span>}
                                                </div>
                                            </td>
                                            <td className="p-4 align-top text-right">
                                                <span className="text-lg font-black text-amber-600 dark:text-amber-400">
                                                    ${parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                            <td className="p-4 align-top text-center">
                                                <div className="flex flex-col gap-2 items-center justify-center">
                                                    <button 
                                                        onClick={() => handleResolveTransfer(tx.id, 'APPROVE')}
                                                        disabled={actionLoader !== null}
                                                        className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9 px-4 rounded-lg transition-all shadow-md shadow-emerald-600/20 disabled:opacity-50 text-xs"
                                                    >
                                                        {actionLoader === tx.id + '-APPROVE' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                        Autorizar
                                                    </button>
                                                    <button 
                                                        onClick={() => handleResolveTransfer(tx.id, 'REJECT')}
                                                        disabled={actionLoader !== null}
                                                        className="w-full flex items-center justify-center gap-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold h-9 px-4 rounded-lg transition-all shadow-sm disabled:opacity-50 text-xs"
                                                    >
                                                        {actionLoader === tx.id + '-REJECT' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                                                        Rechazar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {pendingTransfers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                                                No hay transferencias pendientes por aprobar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
