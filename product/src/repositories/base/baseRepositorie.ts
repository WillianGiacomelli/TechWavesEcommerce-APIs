import prisma from "../../database";

export default class BaseRepository<T> {

    protected model: keyof typeof prisma;

    constructor(model: keyof typeof prisma) {
        this.model = model;
    }

    async create(data: T): Promise<T> {
        return await (prisma[this.model] as any).create({
            data,
        });
    }

    async findAll(): Promise<any[]> {
        return await (prisma[this.model] as any).findMany();
    }

    async findById(id: number): Promise<T | null> {
        return await (prisma[this.model] as any).findFirst({
            where: { id },
        });
    }

    async update(id: number, data: T): Promise<T> {
        return await (prisma[this.model] as any).update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<T> {
        return await (prisma[this.model] as any).delete({
            where: { id },
        });
    }
}