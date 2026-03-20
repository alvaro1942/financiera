import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  console.log("🚀 Iniciando prueba de base de datos...");

  // 1. Verificar que el administrador existe
  const adminEmail = "administrador@gmail.com";
  const admin = await prisma.user.findUnique({
    where: { correo: adminEmail },
  });

  if (admin) {
    console.log(`✅ Administrador encontrado: ${admin.nombres} (${admin.correo})`);
  } else {
    console.log(`⚠️ Administrador no encontrado. Se puede crear si es necesario.`);
  }

  // 2. Crear un usuario de prueba
  const testEmail = `usuario_prueba_${Date.now()}@gmail.com`;
  const testCurp = `TESTCURP${Date.now().toString().substring(5)}`;
  
  console.log(`\n⏳ Intentando crear nuevo usuario (simulación de panel admin): ${testEmail}`);
  
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  const newUser = await prisma.user.create({
    data: {
      nombres: "Usuario",
      apellidoPaterno: "De",
      apellidoMaterno: "Prueba",
      correo: testEmail,
      curp: testCurp,
      celular: "5555555555",
      direccion: "Calle Falsa 123",
      fechaNacimiento: new Date("1990-01-01"),
      password: hashedPassword,
      role: "USER"
    }
  });

  console.log(`✅ Usuario creado exitosamente con ID: ${newUser.id}`);

  // 3. Crear una cuenta bancaria asociada a ese usuario (tal como lo haría el admin)
  await prisma.account.create({
    data: {
      userId: newUser.id,
      balance: 100.00
    }
  });
  console.log(`✅ Cuenta financiera creada para el usuario (balance: $100.00)`);

  // 4. Mostrar total de usuarios actuales
  const totalUsersBefore = await prisma.user.count();
  console.log(`\n📊 Total de usuarios en la plataforma actualmente: ${totalUsersBefore}`);

  // 5. Eliminar el usuario de prueba
  console.log(`\n⏳ Intentando eliminar el usuario de prueba (simulación de acción "eliminar" del admin)...`);
  
  // Como en Prisma pusimos onDelete: Cascade en Account, eliminar el User eliminará su Account.
  await prisma.user.delete({
    where: { id: newUser.id }
  });

  console.log(`✅ Usuario eliminado correctamente.`);

  // 6. Verificar eliminación
  const totalUsersAfter = await prisma.user.count();
  console.log(`📊 Total de usuarios después de eliminar: ${totalUsersAfter}`);
}

main()
  .catch((e) => {
    console.error("❌ Error en la prueba:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("\n🏁 Prueba finalizada.");
  });
