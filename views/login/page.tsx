"use client";

import Link from 'next/link';
import { Landmark, ArrowLeft, Mail, Lock, Eye, Fingerprint, Key, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, getSession } from '@/app/actions/auth';
import { useAuth } from '@/context/AuthContext';

export default function LoginView() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await loginUser(formData);
            
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                // Fetch the new session and update context
                const session = await getSession();
                if (session) {
                    setUser(session as any);
                    router.push('/dashboard');
                } else {
                    setError('Error al iniciar sesión.');
                }
            }
        } catch (err) {
            setError('Ocurrió un error inesperado. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen min-h-[100dvh] w-full bg-background-light dark:bg-background-dark font-display flex-col md:flex-row overflow-hidden">
            
            {/* Left Side: Branding (Visible only on desktop) */}
            <div className="hidden md:flex flex-col relative w-1/2 bg-slate-900 items-center justify-center p-12 h-full">
                <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply"
                    style={{ backgroundImage: 'linear-gradient(135deg, #7a2bbf 0%, #3b0066 100%)' }}
                />
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/40 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent-orange/20 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center max-w-sm text-center">
                    <div className="bg-primary rounded-2xl p-3 flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                        <Landmark className="text-white w-12 h-12" />
                    </div>
                    <h1 className="text-white text-4xl lg:text-5xl font-black tracking-tight mb-4 drop-shadow-lg">CTFIN</h1>
                    <p className="text-white/80 text-base lg:text-lg leading-relaxed font-medium">Banca inteligente sin fronteras. Accede de forma segura y gestiona tu patrimonio.</p>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex-1 flex flex-col relative h-full">
                {/* Decorative Background Element for mobile */}
                <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 opacity-20 pointer-events-none blur-[100px] bg-primary rounded-full z-0"></div>

                <div className="relative z-10 flex flex-col h-full w-full items-center justify-center overflow-y-auto">
                    {/* Top Navigation Frame */}
                    <div className="absolute top-0 left-0 w-full flex items-center p-4 z-20">
                        <Link href="/" className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer bg-slate-100/50 dark:bg-background-dark/50 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors backdrop-blur-md">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="w-full max-w-[340px] flex flex-col py-8 mt-12 md:mt-0">
                        
                        {/* Mobile Logo/Branding (Hidden on desktop) */}
                        <div className="md:hidden mb-6 w-full flex flex-col items-center">
                                <div className="bg-primary rounded-xl p-2.5 flex items-center justify-center mb-3">
                                    <Landmark className="text-white w-8 h-8" />
                                </div>
                                <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-black text-center">CTFIN</h1>
                            </div>

                            {/* Desktop Header Text */}
                            <div className="hidden md:flex flex-col mb-6 text-left">
                                <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight mb-1.5">Iniciar Sesión</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Ingresa tus credenciales para acceder a tu cuenta.</p>
                            </div>

                            {error && (
                                <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900/50">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* Form Section */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Usuario o Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="correo" required className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="Ingresa tu usuario o correo" type="text" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold">Contraseña</label>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="password" required className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/80 h-11 placeholder:text-slate-400 pl-9 pr-9 text-sm font-medium transition-all" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                                        <Eye onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 hover:text-slate-300 w-4 h-4 cursor-pointer transition-colors ${showPassword ? 'text-primary' : 'text-slate-400'}`} />
                                    </div>
                                    <div className="flex justify-end mt-1">
                                        <a className="text-primary text-[11px] font-semibold hover:underline" href="#">¿Olvidaste tu contraseña?</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-1 py-1 mb-1">
                                    <input className="rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-transparent w-3.5 h-3.5 cursor-pointer flex-shrink-0" id="remember" type="checkbox" />
                                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="remember">Mantener sesión iniciada</label>
                                </div>
                                
                                <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {loading ? <><Loader2 className="w-4 h-4 animate-spin"/> Ingresando...</> : 'Ingresar a Mi Cuenta'}
                                </button>
                                
                                <div className="relative flex items-center py-4">
                                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                                    <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-medium uppercase tracking-wider">O acceder con</span>
                                    <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 rounded-xl h-10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                        <Fingerprint className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Biometr&iacute;a</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-background-dark/50 rounded-xl h-10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                        <Key className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Passkey</span>
                                    </button>
                                </div>

                                {/* Desktop Footer Section */}
                                <div className="mt-6 text-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                    <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                                        ¿No tienes una cuenta?
                                        <Link className="text-primary font-bold hover:underline ml-1" href="/register">Regístrate aquí</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}
