"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRightLeft, PiggyBank, Briefcase, CreditCard, MessageCircle } from "lucide-react";

export default function ServiciosView() {
    const whatsappLink = "https://wa.me/5211234567890?text=Hola,%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.";

    const servicios = [
        {
            title: "Transferencias",
            description: "Mueve tu dinero de forma rápida, segura y sin complicaciones. Ideal tanto para uso personal como comercial, asegurando liquidez y movilidad global.",
            icon: <ArrowRightLeft className="w-8 h-8 text-primary" />,
            colorClass: "bg-primary/10 border-primary/20"
        },
        {
            title: "Ahorros",
            description: "Comienza a construir tu estabilidad financiera hoy. Nuestras opciones de ahorro están diseñadas para proteger tu patrimonio combatiendo la inflación y dándote paz mental.",
            icon: <PiggyBank className="w-8 h-8 text-accent-orange" />,
            colorClass: "bg-accent-orange/10 border-accent-orange/20"
        },
        {
            title: "Inversiones",
            description: "Haz que tu dinero trabaje para ti. Accede a herramientas que maximizan tus retornos bajo una perspectiva de crecimiento sólido, analizado por nuestros expertos.",
            icon: <Briefcase className="w-8 h-8 text-accent-green" />,
            colorClass: "bg-accent-green/10 border-accent-green/20"
        },
        {
            title: "Tarjetas de Crédito",
            description: "Obtén la flexibilidad que necesitas para tus compras diarias o emergencias. Diseñadas con tasas súper competitivas y beneficios orientados a maximizar tu estilo de vida.",
            icon: <CreditCard className="w-8 h-8 text-purple-500" />,
            colorClass: "bg-purple-500/10 border-purple-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex justify-center py-10 px-4 md:py-20">
            <div className="max-w-5xl w-full flex flex-col gap-10">
                
                {/* Cabecera */}
                <div className="flex flex-col gap-4 text-center items-center">
                    <Link href="/" className="self-center md:self-auto flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 bg-surface-dark px-4 py-2 rounded-lg border border-border-dark w-fit">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-bold">Volver al inicio</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        Explora nuestros <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-orange to-accent-green">Servicios Financieros</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mt-2">
                        En CTFIN ofrecemos una gama de productos creados para cada etapa de tu vida. Contamos con soluciones simples y eficaces que ponemos a tu entera disposición.
                    </p>
                </div>

                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {servicios.map((servicio, idx) => (
                        <div key={idx} className="bg-surface-dark border border-border-dark p-8 rounded-3xl flex flex-col gap-5 hover:bg-surface-dark/80 transition-all duration-300">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${servicio.colorClass}`}>
                                {servicio.icon}
                            </div>
                            <div>
                                <h3 className="text-white text-2xl font-bold mb-3">{servicio.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                    {servicio.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action (WhatsApp) */}
                <div className="mt-8 bg-gradient-to-r from-background-dark via-surface-dark to-background-dark border border-border-dark rounded-3xl p-8 md:p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden">
                    {/* Efecto decorativo */}
                    <div className="absolute inset-0 bg-accent-green/10 blur-[100px] pointer-events-none"></div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-white relative z-10">¿Te interesa alcanzar tus metas?</h2>
                    <p className="text-slate-300 max-w-xl relative z-10 text-sm md:text-base">
                        Esta información es sólo el comienzo. Nuestros asesores especializados están listos para escucharte, analizar tu situación de manera personalizada y brindarte de inmediato todos los detalles que necesitas, sin compromiso.
                    </p>
                    
                    <a 
                        href={whatsappLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative z-10 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 transform hover:scale-105 active:scale-95"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Obtener Asesoría por WhatsApp
                    </a>
                </div>
                
            </div>
        </div>
    );
}
