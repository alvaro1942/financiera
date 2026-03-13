"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "./auth";

// Check if user is admin
async function isAdmin() {
  const session = await getSession();
  if (!session) return false;
  
  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: { role: true }
  });
  
  return user?.role === "ADMIN";
}

export async function getAllUsers() {
  if (!(await isAdmin())) return { error: "No autorizado." };
  
  try {
    const users = await prisma.user.findMany({
      include: { accounts: true },
      orderBy: { createdAt: 'desc' }
    });
    const mappedUsers = users.map((u: any)=> {
      const mainAccount = u.accounts[0];
      return {
        ...u,
        balance: mainAccount ? parseFloat(mainAccount.balance.toString()) : 0
      };
    });
    return { success: true, users: mappedUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Error al obtener usuarios." };
  }
}

export async function getAllAccountsTransactions() {
  if (!(await isAdmin())) return { error: "No autorizado." };
  
  try {
    const usersWithAccounts = await prisma.user.findMany({
      include: {
        accounts: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Map to an easy layout: one account per user or 0
    const accountsInfo = usersWithAccounts.map(u => {
      const mainAccount = u.accounts[0]; // Assuming 1 account per user right now
      return {
        userId: u.id,
        nombres: u.nombres,
        apellidoPaterno: u.apellidoPaterno,
        correo: u.correo,
        accountId: mainAccount?.id || null,
        balance: mainAccount ? parseFloat(mainAccount.balance.toString()) : 0
      };
    });
    
    return { success: true, accounts: accountsInfo };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return { error: "Error al obtener trámites/cuentas." };
  }
}

export async function fundAccount(userId: string, amount: number) {
  if (!(await isAdmin())) return { error: "No autorizado." };
  
  try {
    // Check if user already has an account
    let account = await prisma.account.findFirst({
      where: { userId }
    });
    
    if (account) {
      // Add balance
      account = await prisma.account.update({
        where: { id: account.id },
        data: {
          balance: {
            increment: amount
          }
        }
      });
    } else {
      // Create new account
      account = await prisma.account.create({
        data: {
          userId,
          balance: amount
        }
      });
    }
    
    return { success: true, message: `Se abonaron $${amount} exitosamente.` };
  } catch (error) {
    console.error("Error funding account:", error);
    return { error: "Ocurrió un error al fondear la cuenta." };
  }
}

export async function toggleAdminRole(targetUserId: string) {
    // Only an existing admin can make another admin
    if (!(await isAdmin())) return { error: "No autorizado." };

    try {
        const user = await prisma.user.findUnique({ where: { id: targetUserId }});
        if (!user) return { error: "Usuario no encontrado" };

        const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
        await prisma.user.update({
            where: { id: targetUserId },
            data: { role: newRole }
        });
        return { success: true, message: `Rol actualizado a ${newRole}` };
    } catch (error) {
        console.error(error);
        return { error: "Error actualizando rol" };
    }
}
