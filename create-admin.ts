import { config } from "dotenv";
config();
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// @ts-ignore
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const correo = "administrador@gmail.com";
    const password = "Administrador1012";

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { correo }
        });

        if (existingUser) {
            console.log("El usuario ya existe, actualizando su rol a ADMIN y contrase\u00f1a...");
            await prisma.user.update({
                where: { correo },
                data: { 
                    role: "ADMIN",
                    password: hashedPassword
                }
            });
            console.log("\u00a1Listo! Usuario actualizado a Super Administrador.");
        } else {
            console.log("Creando nuevo Super Administrador...");
            await prisma.user.create({
                data: {
                    nombres: "Super",
                    apellidoPaterno: "Administrador",
                    apellidoMaterno: "",
                    curp: "ADMIN1234567890ABCD",
                    fechaNacimiento: new Date("1990-01-01"),
                    celular: "5555555555",
                    correo: correo,
                    direccion: "Oficinas Centrales",
                    password: hashedPassword,
                    role: "ADMIN"
                }
            });
            console.log("\u00a1Listo! Nuevo Super Administrador creado con \u00e9xito.");
        }
    } catch (error) {
        console.error("Ocurri\u00f3 un error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
