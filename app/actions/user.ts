"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./auth";
import bcrypt from "bcryptjs";

export async function getUserProfile() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      include: {
        accounts: true
      }
    });

    if (!user) return null;

    const mainAccount = user.accounts && user.accounts[0];

    return {
      id: user.id,
      nombres: user.nombres,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      curp: user.curp,
      fechaNacimiento: user.fechaNacimiento,
      celular: user.celular,
      direccion: user.direccion,
      correo: user.correo,
      balance: mainAccount ? parseFloat(mainAccount.balance.toString()) : 0
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "No autorizado." };

  try {
    const nombres = formData.get("nombres") as string;
    const apellidoPaterno = formData.get("apellidoPaterno") as string;
    const apellidoMaterno = formData.get("apellidoMaterno") as string;
    const fechaNacimiento = formData.get("fechaNacimiento") as string;
    const celular = formData.get("celular") as string;
    const direccion = formData.get("direccion") as string;
    const nuevaContrasena = formData.get("nuevaContrasena") as string;
    const confirmarContrasena = formData.get("confirmarContrasena") as string;

    // Build the data object to update
    const updateData: any = {
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento: new Date(fechaNacimiento),
      celular,
      direccion,
    };

    // If user provided a new password, validate and hash it
    if (nuevaContrasena) {
      if (nuevaContrasena !== confirmarContrasena) {
        return { error: "Las contraseñas nuevas no coinciden." };
      }
      if (nuevaContrasena.length < 6) {
        return { error: "La nueva contraseña debe tener al menos 6 caracteres." };
      }
      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: session.userId as string },
      data: updateData
    });

    return { success: true, message: "Perfil actualizado exitosamente." };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { error: "Ocurrió un error al actualizar el perfil." };
  }
}

export async function getUserTransactions() {
  const session = await getSession();
  if (!session) return { error: "No autorizado." };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      include: { accounts: true }
    });

    if (!user || !user.accounts || user.accounts.length === 0) {
      return { success: true, transactions: [] };
    }

    const mainAccount = user.accounts[0];
    const transactions = await prisma.transaction.findMany({
      where: { accountId: mainAccount.id },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const serialized = transactions.map((t: any) => ({
      id: t.id,
      amount: parseFloat(t.amount.toString()),
      type: t.type,
      status: t.status,
      createdAt: t.createdAt.toISOString()
    }));

    console.log(`[DEBUG] Transacciones encontradas para usuario ${session.userId}: ${serialized.length}`);
    return { success: true, transactions: serialized };
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    return { error: "Error al obtener movimientos." };
  }
}
