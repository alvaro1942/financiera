"use client";

import Link from 'next/link';
import { Home, Wallet, TrendingUp, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname !== '/') return false;
        return pathname.startsWith(path);
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-dark bg-surface-dark px-4 pb-4 pt-2 flex justify-around items-center">
            <Link className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-slate-400 hover:text-slate-300'} transition-colors`} href="/">
                <Home className={`w-6 h-6 ${isActive('/') ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-bold">Inicio</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 ${isActive('/deposit') ? 'text-emerald-500' : 'text-slate-400 hover:text-slate-300'} transition-colors`} href="/deposit">
                <Wallet className={`w-6 h-6 ${isActive('/deposit') ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-bold">Billetera</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400 hover:text-slate-300'} transition-colors`} href="/dashboard">
                <TrendingUp className={`w-6 h-6 ${isActive('/dashboard') ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-bold">Invertir</span>
            </Link>
            <Link className={`flex flex-col items-center gap-1 ${isActive('/perfil') ? 'text-primary' : 'text-slate-400 hover:text-slate-300'} transition-colors`} href="/dashboard">
                <User className={`w-6 h-6 ${isActive('/perfil') ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-bold">Perfil</span>
            </Link>
        </div>
    );
}
