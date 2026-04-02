import Link from 'next/link';
import {
    ArrowRightLeft,
    PiggyBank,
    HandCoins,
    ArrowRight,
    Globe,
    Share2,
    AtSign,
    Home,
    Wallet,
    TrendingUp,
    User,
    Landmark,
    ChevronRight
} from "lucide-react";

export default function HomeView() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased flex flex-col min-h-screen">
            <main className="relative flex-grow">
                {/* Sección Hero */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="z-10 flex flex-col gap-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                                <span className="flex h-2 w-2 rounded-full bg-accent-green"></span>
                                <span className="text-primary text-xs font-bold uppercase tracking-wider">Nueva Era Financiera</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight">
                                    Banca <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-orange to-accent-green">Inteligente</span> para tu Futuro
                                </h1>
                                <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
                                    Experimenta la próxima generación en gestión financiera con CTFIN. Herramientas seguras, rápidas e intuitivas para hacer crecer tu patrimonio.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/register" className="bg-primary hover:bg-primary/90 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2">
                                    Únete Ahora
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                                <button className="bg-surface-dark border border-border-dark hover:border-primary/50 text-white text-lg font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                                    Ver Demo
                                </button>
                            </div>
                            <div className="flex items-center gap-6 pt-4">
                                <div className="flex -space-x-3">
                                    <div className="h-10 w-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img className="h-full w-full object-cover" alt="Avatar de usuario 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI4RuDNXIlftr3nct6yeWdVCuMZX9nENy0P9CU7vhEzKH1D98cLYiSV_yPj0-ZIM1ec_WrGfVJk3VqWbfWw32aTwnsgGLNVsExTDUiSa4CpdkYbpZ5Gm-hD15Tli2t1W965C17-mlOpYBrap9fVL9l_esUuu_g96u2vZ8HVYsNAKfCq20Cf3weD3iT9qx1N8JtyPASbqssIin3iAUfT7kVJODcdXp74tCsmQHbNsvFSflF3RoI_z4aBxzorps1uLJy9zNMsOlSXGHf" />
                                    </div>
                                    <div className="h-10 w-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img className="h-full w-full object-cover" alt="Avatar de usuario 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1EJjAxCxElmDJyEPVoDFcL1hVwr9q4tmLVnWY6K04KkjT1kCivniCXQk09UlawtprpbIKuPO2TtQoYc08rkbWctiRJaYvZTe1WCb1xiQ07jojK3z9xm-lzNDRpcBYg-fqQ65szopFkeyej6MghoMLpJAVgwI6KIn6-o4U3GiNRyNCoACmepcrBEHO3Ew5i6b6vQYyl147r34VdCDJ1S5FzdKJBcJQeh8-hll9hLlHF2fnUj_pR2S1qbU6x_3TAMOwpR48cbP24oBq" />
                                    </div>
                                    <div className="h-10 w-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img className="h-full w-full object-cover" alt="Avatar de usuario 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzFodkoAztXqRQz9lQNFAnT1jUKCL1MneQHddPpZ6qcjdMPgILiOZR9n9-HiYfQMFSFz2nDi4r3ewB3nIaeKbq4slgX1nwPztszkKCs6rF3lMoIylpccjPCv6GgziEM5Vj7D1tLbfCs37slC0lbFmlzKhmD1zn_KcvFg7hjQ2FXD74SXdQOG7E_O3kEAnNtQD1u66DWNLRFJoLkfMD6OQOVSN1Jht9i-aTPkxx5I8Og9f2KiNnpIuSjuQCeOkppYOV17I1I6WYzGVl" />
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Más de <span className="text-white font-bold">2k</span> usuarios se unieron este mes</p>
                            </div>
                        </div>

                        <div className="relative lg:h-[600px] flex items-center justify-center">
                            {/* Gráfico abstracto de fondo */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent-orange/10 to-accent-green/10 rounded-full blur-[100px] opacity-50"></div>
                            <div className="relative w-full max-w-md aspect-square group">
                                <div className="absolute inset-0 rounded-3xl bg-surface-dark border border-border-dark shadow-2xl overflow-hidden">
                                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0" alt="Mockup de interfaz de aplicación de banca móvil" src="/banking_mockup_green.png" />
                                </div>

                                {/* Tarjetas flotantes */}
                                <div className="absolute top-8 -right-4 bg-background-dark/90 border border-border-dark p-4 rounded-xl shadow-2xl backdrop-blur-sm z-20">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-accent-green/20 rounded-lg">
                                            <Landmark className="text-accent-green w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Recibido</p>
                                            <p className="text-white font-bold">+$1,240.00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-12 -left-6 bg-background-dark/90 border border-border-dark p-5 rounded-xl shadow-2xl backdrop-blur-sm z-20">
                                    <div className="flex flex-col gap-2">
                                        <p className="text-slate-400 text-xs font-medium">Crecimiento de Inversión</p>
                                        <div className="flex items-end gap-2">
                                            <p className="text-2xl font-black text-white">+24.8%</p>
                                            <TrendingUp className="text-accent-green w-5 h-5 pb-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección de Servicios */}
                <section className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-accent-orange text-sm font-bold uppercase tracking-[0.2em]">Nuestros Servicios</h2>
                            <h3 className="text-white text-3xl md:text-4xl font-bold">Soluciones integrales para cada objetivo</h3>
                        </div>
                        <p className="text-slate-400 max-w-sm text-sm">
                            Productos financieros diseñados a medida para darte control total sobre tu dinero, en cualquier momento y lugar.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Servicio 1 */}
                        <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-primary/50 hover:bg-surface-dark/80 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <ArrowRightLeft className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-white text-xl font-bold">Transferencias</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Envía y recibe fondos a nivel global en segundos. Disfruta de transferencias sin comisiones dentro de la red y tipos de cambio competitivos.
                                </p>
                            </div>
                            <a className="mt-auto flex items-center gap-2 text-primary font-bold text-sm" href="#">
                                Conoce más <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Servicio 2 */}
                        <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-accent-orange/50 hover:bg-surface-dark/80 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors">
                                <PiggyBank className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-white text-xl font-bold">Ahorros</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Haz crecer tu dinero con cuentas que generan altos rendimientos. Sin requisitos de saldo mínimo y con acceso instantáneo a tus fondos.
                                </p>
                            </div>
                            <a className="mt-auto flex items-center gap-2 text-accent-orange font-bold text-sm" href="#">
                                Conoce más <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Servicio 3 */}
                        <div className="group flex flex-col gap-6 rounded-2xl border border-border-dark bg-surface-dark p-8 hover:border-accent-green/50 hover:bg-surface-dark/80 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center text-accent-green group-hover:bg-accent-green group-hover:text-white transition-colors">
                                <HandCoins className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h4 className="text-white text-xl font-bold">Inversiones</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Accede a mercados globales con herramientas expertas en gestión de carteras. Opera acciones, ETFs y criptomonedas con seguridad de grado institucional.
                                </p>
                            </div>
                            <a className="mt-auto flex items-center gap-2 text-accent-green font-bold text-sm" href="#">
                                Conoce más <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                    </div>
                </section>

                {/* Sección de Llamado a la Acción (CTA) */}
                <section className="max-w-7xl mx-auto px-4 py-20">
                    <div className="relative bg-gradient-to-r from-primary/20 to-surface-dark border border-border-dark rounded-[2rem] p-8 md:p-16 overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex flex-col gap-4 text-center md:text-left">
                                <h2 className="text-white text-3xl md:text-5xl font-black">¿Listo para tomar el control?</h2>
                                <p className="text-slate-300 text-lg max-w-md">Únete a los más de 500,000 clientes que confían en CTFIN para su futuro financiero.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                                <button className="bg-white text-background-dark text-lg font-bold px-10 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                                    Abrir Cuenta
                                </button>
                                <button className="bg-transparent border border-white text-white text-lg font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors">
                                    Contactar Ventas
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="bg-background-dark border-t border-border-dark mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary rounded-lg p-1 flex items-center justify-center">
                                    <Landmark className="text-white w-5 h-5" />
                                </div>
                                <h2 className="text-white text-lg font-black">CTFIN</h2>
                            </div>
                            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                                Redefiniendo la experiencia financiera para la era moderna. Banca segura, inteligente y sin fronteras para todos.
                            </p>
                            <div className="flex gap-4">
                                <a className="h-10 w-10 rounded-lg bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors" href="#">
                                    <Globe className="w-5 h-5" />
                                </a>
                                <a className="h-10 w-10 rounded-lg bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors" href="#">
                                    <Share2 className="w-5 h-5" />
                                </a>
                                <a className="h-10 w-10 rounded-lg bg-surface-dark flex items-center justify-center text-slate-400 hover:text-white transition-colors" href="#">
                                    <AtSign className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h5 className="text-white font-bold text-sm">Producto</h5>
                            <ul className="flex flex-col gap-2 text-slate-400 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#">Ahorros</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Inversiones</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Tarjetas de Crédito</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Criptomonedas</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h5 className="text-white font-bold text-sm">Empresa</h5>
                            <ul className="flex flex-col gap-2 text-slate-400 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#">Sobre Nosotros</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Empleos</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Prensa</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Contacto</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h5 className="text-white font-bold text-sm">Soporte</h5>
                            <ul className="flex flex-col gap-2 text-slate-400 text-sm">
                                <li><a className="hover:text-primary transition-colors" href="#">Centro de Ayuda</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Seguridad</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Términos</a></li>
                                <li><a className="hover:text-primary transition-colors" href="#">Privacidad</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-xs">© 2024 CTFIN Financial Services Inc. Todos los derechos reservados.</p>
                        <div className="flex gap-6 text-slate-500 text-xs">
                            <a className="hover:text-white" href="#">Política de Privacidad</a>
                            <a className="hover:text-white" href="#">Términos de Servicio</a>
                            <a className="hover:text-white" href="#">Configuración de Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Barra de Navegación Inferior (Sólo Móvil) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-dark bg-surface-dark px-4 pb-4 pt-2 flex justify-around items-center">
                <Link className="flex flex-col items-center gap-1 text-primary" href="/">
                    <Home className="w-6 h-6 fill-current" />
                    <span className="text-[10px] font-bold">Inicio</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors" href="/deposit">
                    <Wallet className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Billetera</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors" href="/dashboard">
                    <TrendingUp className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Invertir</span>
                </Link>
                <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors" href="/dashboard">
                    <User className="w-6 h-6" />
                    <span className="text-[10px] font-bold">Perfil</span>
                </Link>
            </div>
        </div>
    );
}
