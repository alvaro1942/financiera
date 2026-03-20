"use client";

import Link from 'next/link';
import { Landmark, Globe, Share2, AtSign } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-background-dark border-t border-border-dark mt-auto relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
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
                            <li><Link className="hover:text-primary transition-colors" href="/servicios">Ahorros</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/servicios">Inversiones</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/servicios">Tarjetas de Crédito</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h5 className="text-white font-bold text-sm">Soporte</h5>
                        <ul className="flex flex-col gap-2 text-slate-400 text-sm">
                            <li>
                                <a className="hover:text-primary transition-colors flex items-center gap-2" href="https://wa.me/5211234567890" target="_blank" rel="noopener noreferrer">
                                    Contacto
                                </a>
                            </li>
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
    );
}
