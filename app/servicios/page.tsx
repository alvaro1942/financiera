import ServiciosView from "@/views/servicios/page";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Servicios y Herramientas | CTFIN",
    description: "Conoce todos nuestros servicios de inversión, ahorro, transferencias y tarjetas de crédito para que lleves el control de tu economía.",
};

export default function ServiciosPage() {
    return <ServiciosView />;
}
