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
    const accountsInfo = usersWithAccounts.map((u: any) => {
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

export async function deductAccount(userId: string, amount: number) {
  if (!(await isAdmin())) return { error: "No autorizado." };
  
  try {
    let account = await prisma.account.findFirst({
      where: { userId }
    });
    
    if (account) {
      if (Number(account.balance) < amount) {
          return { error: "El usuario no tiene saldo suficiente para restar esa cantidad." };
      }
      account = await prisma.account.update({
        where: { id: account.id },
        data: {
          balance: {
            decrement: amount
          }
        }
      });
      return { success: true, message: `Se restaron $${amount} exitosamente.` };
    } else {
      return { error: "El usuario no tiene una cuenta activa." };
    }
  } catch (error) {
    console.error("Error deducting account:", error);
    return { error: "Ocurrió un error al restar saldo de la cuenta." };
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

export async function deleteUser(targetUserId: string) {
    if (!(await isAdmin())) return { error: "No autorizado." };

    try {
        const user = await prisma.user.findUnique({ where: { id: targetUserId }});
        if (!user) return { error: "Usuario no encontrado" };
        if (user.role === 'ADMIN') return { error: "No se puede eliminar a otro administrador" };

        await prisma.user.delete({
            where: { id: targetUserId }
        });
        return { success: true, message: "Usuario eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return { error: "Error eliminando usuario" };
    }
}

export async function createUserByAdmin(data: any) {
    if (!(await isAdmin())) return { error: "No autorizado." };

    try {
        const { nombres, apellidoPaterno, apellidoMaterno, correo, password, curp, celular, direccion, fechaNacimiento, role } = data;
        
        const existingEmail = await prisma.user.findUnique({ where: { correo } });
        if (existingEmail) return { error: "El correo ya está registrado." };

        const existingCurp = await prisma.user.findUnique({ where: { curp } });
        if (existingCurp) return { error: "La CURP ya está registrada." };

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                nombres,
                apellidoPaterno,
                apellidoMaterno,
                correo,
                curp,
                celular,
                direccion,
                fechaNacimiento: new Date(fechaNacimiento),
                password: hashedPassword,
                role: role || 'USER'
            }
        });

        // Add a default account for the user
        await prisma.account.create({
            data: {
                userId: newUser.id,
                balance: 0.0
            }
        });

        return { success: true, message: "Usuario creado correctamente", user: newUser };
    } catch (error) {
        console.error("Error al crear usuario desde admin:", error);
        return { error: "Error al crear usuario" };
    }
}
