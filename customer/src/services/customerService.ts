import prisma from "../database";
import CustomerCreateModel from "../models/customer/request/create/customerCreate.model";
import PersonRepository from "../repositories/person/person-repositorie";
import PersonRoleRepository from "../repositories/personRole/person-role-repositorie";

export default class CustomerService{
    private personRepository: PersonRepository;
    private personRoleRepository: PersonRoleRepository;

    constructor(){
        this.personRepository = new PersonRepository('user');
        this.personRoleRepository = new PersonRoleRepository('userRole');
    }

    async createCustomer(data: CustomerCreateModel) : Promise<any> {
        // if(!(data instanceof CustomerCreateModel)){
        //     throw new Error("Wrong data type");
        // }

        const roleId = await this.personRoleRepository.findRoleByText("USER");

        if(!roleId){
            throw new Error("Role not found");
        };

        data.person.roleId = roleId.id;
        
        const personCpf = await this.personRepository.findByCpf(data.person.cpf);
        const user = await this.personRepository.create(data.person);
        return user;
    }

}