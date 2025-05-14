import { PrismaClient } from '@prisma/client';
import BaseRepository from "../base/baseRepositorie";
import ContactModel from '../../models/customer/request/create/contact.model';

export default class PersonContactRepository  extends BaseRepository<ContactModel>{

    constructor(model: keyof PrismaClient) {
        super(model);
    }

}