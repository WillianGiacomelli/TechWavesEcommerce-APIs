import prisma from "../database";
import CustomerCreateModel from "../models/customer/request/create/customerCreate.model";
import PersonRepository from "../repositories/person/person-repositorie";

export default class CustomerService{
    private personRepository: PersonRepository;

    constructor(){
        this.personRepository = new PersonRepository('user');
    }

    async createCustomer(data: CustomerCreateModel) : Promise<any> {
        // if(!(data instanceof CustomerCreateModel)){
        //     throw new Error("Wrong data type");
        // }
        data.person.roleId = 2;
        console.log(data);
        const user = await this.personRepository.create(data.person);
        return user;
    }

}