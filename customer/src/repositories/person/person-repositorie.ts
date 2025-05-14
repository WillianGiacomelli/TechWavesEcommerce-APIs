import { PrismaClient } from '@prisma/client';
import PersonModel from "../../models/customer/request/create/person.model";
import BaseRepository from "../base/baseRepositorie";
import prisma from "../../database";

export default class PersonRepository  extends BaseRepository<PersonModel>{

    constructor(model: keyof PrismaClient) {
        super(model);
    }

    async findByEmail(email: string): Promise<PersonModel | null> {
        return await (prisma[this.model] as any).findFirst({
          where: { email },
        });
      }
    
      async findByCpf(cpf: string): Promise<PersonModel | null> {
        return await (prisma[this.model] as any).findFirst({
          where: { cpf },
        });
      }
}