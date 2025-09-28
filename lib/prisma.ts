import { PrismaClient } from "@prisma/client";

declare global {
    // Para evitar múltiples instancias de Prisma en modo desarrollo
    var prisma: PrismaClient | undefined;
}


export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ["query"], // opcional, ayuda a depurar
    });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
