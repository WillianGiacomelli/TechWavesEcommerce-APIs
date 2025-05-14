import { PrismaClient } from '@prisma/client';
import PersonModel from "../../models/customer/request/create/person.model";
import BaseRepository from "../base/baseRepositorie";
import prisma from "../../database";

export default class AddressRepository  extends BaseRepository<any>{

    constructor(model: keyof PrismaClient) {
        super(model);
    }

}