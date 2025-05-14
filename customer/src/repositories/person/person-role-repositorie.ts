import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import PersonModel from "../../models/customer/request/create/person.model";
import BaseRepository from "../base/baseRepositorie";
import { PrismaClient } from "@prisma/client";
import prisma from "../../database";
import PersonRoleModel from "../../models/person/role/personRole.model";

export default class PersonRoleRepository  extends BaseRepository<PersonRoleModel>{

    constructor(model: keyof PrismaClient) {
        super(model);
    }

    async findRoleByText(text: string): Promise<PersonRoleModel | null> {
        return await (prisma[this.model] as any).findFirst({
          where: { 
            role: text 
          },
        });
      }
}