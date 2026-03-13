"use client";

import Link from 'next/link';
import { Landmark, User, Menu, X, Send, PlusCircle, Wallet, CreditCard, Shield } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border-dark bg-background-dark/80 backdrop-blur-md">
            <div className="max-w-[448px] mx-auto sm:max-w-7xl flex items-center justify-between p-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
                        <Landmark className="text-white w-6 h-6" />
                    </div>
                    <h2 className="text-white text-xl font-black leading-tight tracking-tight">CTFIN</h2>
                </Link>

                {/* Desktop Navigation Links (Only for logged in users) */}
                {user && (
                    <nav className="hidden sm:flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2 group cursor-pointer">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white group-active:scale-95 transition-transform border border-primary/50 shadow-lg shadow-primary/20">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="text-white text-sm font-bold transition-colors">Mi cuenta</span>
                        </Link>
                        <Link href="/transfer" className="flex items-center gap-2 group cursor-pointer">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#271d30] text-[#00a8ff] group-active:scale-95 transition-transform border border-[#362843]">
                                <Send className="w-4 h-4" />
                            </div>
                            <span className="text-slate-300 hover:text-white text-sm font-semibold transition-colors">Transferir</span>
                        </Link>
                        <Link href="/deposit" className="flex items-center gap-2 group cursor-pointer">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#271d30] text-emerald-500 group-active:scale-95 transition-transform border border-[#362843]">
                                <PlusCircle className="w-4 h-4" />
                            </div>
                            <span className="text-slate-300 hover:text-white text-sm font-semibold transition-colors">Depositar</span>
                        </Link>
                        <Link href="/withdraw" className="flex items-center gap-2 group cursor-pointer">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-[#271d30] text-orange-500 group-active:scale-95 transition-transform border border-[#362843]">
                                <Wallet className="w-4 h-4" />
                            </div>
                            <span className="text-slate-300 hover:text-white text-sm font-semibold transition-colors">Retirar</span>
                        </Link>
                        {user?.role === "ADMIN" && (
                            <Link href="/admin" className="flex items-center gap-2 group cursor-pointer">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#271d30] text-purple-500 group-active:scale-95 transition-transform border border-[#362843]">
                                    <Shield className="w-4 h-4" />
                                </div>
                                <span className="text-slate-300 hover:text-white text-sm font-semibold transition-colors">Admin</span>
                            </Link>
                        )}
                    </nav>
                )}

                <div className="flex items-center gap-4">
                    {!user ? (
                        <Link href="/login" className="hidden sm:block text-slate-300 hover:text-white text-sm font-bold px-4 py-2">
                            Ingresar
                        </Link>
                    ) : (
                        <div className="hidden sm:flex items-center gap-4">
                            <button onClick={handleLogout} className="text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white text-sm font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors border border-slate-700">
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                    <button 
                        className="sm:hidden text-white flex items-center p-2 rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-background-dark border-b border-border-dark p-4 shadow-xl flex flex-col gap-4 z-50">
                    <nav className="flex flex-col gap-2 max-w-7xl mx-auto w-full">
                        {user && (
                            <>
                                <Link 
                                    href="/transfer" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#271d30] text-[#00a8ff] group-active:scale-95 transition-transform border border-[#362843]">
                                        <Send className="w-5 h-5" />
                                    </div>
                                    <span className="text-white font-semibold">Transferir</span>
                                </Link>
                                
                                <Link 
                                    href="/deposit" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#271d30] text-emerald-500 group-active:scale-95 transition-transform border border-[#362843]">
                                        <PlusCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-white font-semibold">Depositar</span>
                                </Link>
                                
                                <Link 
                                    href="/withdraw" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#271d30] text-orange-500 group-active:scale-95 transition-transform border border-[#362843]">
                                        <Wallet className="w-5 h-5" />
                                    </div>
                                    <span className="text-white font-semibold">Retirar</span>
                                </Link>

                                {user?.role === "ADMIN" && (
                                    <Link 
                                        href="/admin" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-[#271d30] text-purple-500 group-active:scale-95 transition-transform border border-[#362843]">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                        <span className="text-white font-semibold flex items-center gap-2 text-purple-400">Admin</span>
                                    </Link>
                                )}

                                <hr className="border-[#271d30] my-2" />
                            </>
                        )}

                        <div className="flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link 
                                        href="/dashboard" 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
                                    >
                                        <User className="w-5 h-5" />
                                        Mi cuenta
                                    </Link>
                                    <button 
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="text-slate-300 hover:text-white font-bold p-3 text-center rounded-xl hover:bg-white/5 transition-colors w-full text-left"
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    href="/login" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-slate-300 hover:text-white font-bold p-3 text-center rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    Ingresar
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
