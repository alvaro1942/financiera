import { prisma } from "@/lib/prisma";

export default async function BackfillPage() {
    let result = [];
    try {
        const accounts = await prisma.account.findMany({
            include: { transactions: true }
        });

        for (const account of accounts) {
            let sumaTransaccional = 0;
            for (const tx of account.transactions) {
                const amount = parseFloat(tx.amount.toString());
                if (tx.type === 'DEPOSIT') {
                    sumaTransaccional += amount;
                } else if (tx.type === 'WITHDRAWAL') {
                    sumaTransaccional -= amount;
                }
            }

            const balanceActual = parseFloat(account.balance.toString());
            const missingBalance = balanceActual - sumaTransaccional;

            if (Math.abs(missingBalance) > 0.01) {
                const type = missingBalance >= 0 ? 'DEPOSIT' : 'WITHDRAWAL';
                await prisma.transaction.create({
                    data: {
                        accountId: account.id,
                        amount: Math.abs(missingBalance),
                        type: type,
                        status: "COMPLETED",
                        createdAt: account.createdAt 
                    }
                });
                result.push(`Cuenta reformada: ${account.id} por $${missingBalance}`);
            }
        }
    } catch (e: any) {
        return <div className="text-white p-10 font-mono">Error: {e.message}</div>;
    }

    return (
        <div className="text-white p-10 font-mono text-xl">
            Saldos antiguos importados al historial exitosamente.
            <br />
            {result.length} cuentas restauradas.
            <br /><br />
            {result.map(r => <div key={r}>{r}</div>)}
            <br />
            [Cierra esta página y vuelve a tu Dashboard].
        </div>
    );
}
