import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const emailToUpgrade = process.argv[2];

async function main() {
    if (!emailToUpgrade) {
        console.error("Por favor, proporciona el correo del usuario a convertir en admin. Ejemplo:");
        console.error("node change-role.mjs usuario@correo.com");
        process.exit(1);
    }

    try {
        const user = await prisma.user.update({
            where: { correo: emailToUpgrade },
            data: { role: "ADMIN" }
        });
        console.log(`¡Éxito! El usuario ${user.nombres} (${user.correo}) ahora es ADMINISTRADOR.`);
    } catch (error) {
        console.error("Error: ¿Seguro que el correo existe en la base de datos?", error.meta?.cause || error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
