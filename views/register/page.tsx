"use client";

import Link from 'next/link';
import { Landmark, ArrowLeft, Mail, Lock, User, Calendar, Phone, MapPin, CreditCard, UploadCloud, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/actions/auth';

export default function RegisterView() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await registerUser(formData);
            
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) {
                setSuccess(result.message || 'Cuenta creada exitosamente.');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch (err) {
            setError('Ocurrió un error inesperado al enviar los datos. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName(null);
        }
    };

    return (
        <div className="flex min-h-[100dvh] w-full bg-background-light dark:bg-background-dark font-display flex-col md:flex-row overflow-hidden">
            
            {/* Left Side: Branding (Visible only on desktop) */}
            <div className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[40%] bg-slate-900 items-center justify-center p-12">
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
                    <p className="text-white/80 text-base lg:text-lg leading-relaxed font-medium">Crea tu cuenta y forma parte de la revolución financiera más segura.</p>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="flex-1 flex flex-col relative md:ml-[40%] h-full min-h-screen">
                {/* Decorative Background Element for mobile */}
                <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 opacity-20 pointer-events-none blur-[100px] bg-primary rounded-full z-0"></div>

                <div className="relative z-10 flex flex-col w-full items-center py-10 px-4 md:px-12 overflow-y-auto">
                    {/* Top Navigation Frame */}
                    <div className="absolute top-0 left-0 w-full flex items-center p-4 z-20 md:hidden">
                        <Link href="/" className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer bg-slate-100/50 dark:bg-background-dark/50 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors backdrop-blur-md">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="w-full max-w-xl flex flex-col mt-12 md:mt-0">
                        {/* Mobile Logo/Branding (Hidden on desktop) */}
                        <div className="md:hidden mb-6 w-full flex flex-col items-center">
                            <div className="bg-primary rounded-xl p-2.5 flex items-center justify-center mb-3">
                                <Landmark className="text-white w-8 h-8" />
                            </div>
                            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-black text-center">CTFIN</h1>
                        </div>

                        {/* Desktop Header Text */}
                        <div className="hidden md:flex items-center gap-4 mb-4 text-left">
                            <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
                                <ArrowLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight mb-1.5">Crear Cuenta</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Comienza completando tus datos personales reales.</p>
                            </div>
                        </div>

                        {/* Mobile Header Text */}
                        <div className="md:hidden flex flex-col mb-4 text-center">
                            <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight mb-1.5">Crear Cuenta</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Completa el formulario para registrarte.</p>
                        </div>

                        {error && (
                            <div className="mb-4 flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900/50">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 flex items-center gap-2 p-4 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm rounded-xl border border-green-200 dark:border-green-900/50">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <p>{success} Redirigiendo...</p>
                            </div>
                        )}

                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full bg-white/50 dark:bg-background-dark/30 p-6 md:p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm shadow-xl">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Nombres */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Nombres</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="nombres" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="Tus nombres" type="text" required />
                                    </div>
                                </div>
                                
                                {/* Apellido Paterno */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Apellido Paterno</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="apellidoPaterno" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="Primer apellido" type="text" required />
                                    </div>
                                </div>
                                
                                {/* Apellido Materno */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Apellido Materno</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="apellidoMaterno" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="Segundo apellido" type="text" required />
                                    </div>
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Fecha de Nacimiento</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="fechaNacimiento" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all [color-scheme:light] dark:[color-scheme:dark]" type="date" required />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">CURP</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input name="curp" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all uppercase" placeholder="Clave Única de Registro" maxLength={18} type="text" required />
                                </div>
                            </div>

                            {/* Celular */}
                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Número Celular</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input name="celular" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="10 dígitos" type="tel" maxLength={10} required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                                {/* Correo */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="correo" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="tucorreo@ejemplo.com" type="email" required />
                                    </div>
                                </div>

                                {/* Confirmar Correo */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Confirmar Correo</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="confirmarCorreo" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all" placeholder="Confirma tu correo" type="email" required />
                                    </div>
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Dirección Completa</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-4 text-slate-400 w-4 h-4" />
                                    <textarea name="direccion" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 min-h-[80px] py-3 placeholder:text-slate-400 pl-9 pr-4 text-sm font-medium transition-all resize-y" placeholder="Calle, Número, Colonia, Ciudad, Estado, C.P." required></textarea>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                                {/* Contraseña */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="password" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-10 text-sm font-medium transition-all" placeholder="Mínimo 8 caracteres" type={showPassword ? "text" : "password"} required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors focus:outline-none">
                                            {showPassword ? <EyeOff className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirmar Contraseña */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1">Confirmar Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                        <input name="confirmarPassword" className="form-input flex w-full rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 h-11 placeholder:text-slate-400 pl-9 pr-10 text-sm font-medium transition-all" placeholder="Confirma contraseña" type={showConfirmPassword ? "text" : "password"} required />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors focus:outline-none">
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* INE - Archivo */}
                            <div className="flex flex-col gap-1.5 mt-2">
                                <label className="text-slate-900 dark:text-slate-300 text-xs font-semibold ml-1 flex items-center gap-1">Identificación Oficial (INE) <span className="text-slate-400 dark:text-slate-500 font-normal text-[10px]">(Opcional)</span></label>
                                <label className="group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary transition-all cursor-pointer overflow-hidden relative">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {fileName ? (
                                            <>
                                                <CheckCircle2 className="w-8 h-8 mb-3 text-green-500" />
                                                <p className="mb-1 text-sm text-slate-700 dark:text-slate-300 font-semibold">{fileName}</p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">Haz clic para cambiar de archivo</p>
                                            </>
                                        ) : (
                                            <>
                                                <UploadCloud className="w-8 h-8 mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                                                <p className="mb-1 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold text-primary">Haz clic para subir</span> o arrastra tu archivo aquí</p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">JPG, PNG o PDF (Max. 5MB)</p>
                                            </>
                                        )}
                                    </div>
                                    <input name="ineFile" type="file" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" accept="image/jpeg, image/png, application/pdf" onChange={handleFileChange} />
                                </label>
                            </div>

                            <button disabled={loading} type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 text-[15px] shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed">
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </button>
                            
                            {/* Desktop Footer Section */}
                            <div className="mt-4 text-center">
                                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                                    ¿Ya tienes una cuenta?
                                    <Link className="text-primary font-bold hover:underline ml-1" href="/login">Inicia Sesión</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
