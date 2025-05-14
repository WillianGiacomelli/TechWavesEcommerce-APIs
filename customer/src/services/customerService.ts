import CustomerCreateModel from "../models/customer/request/create/customerCreate.model";
import LoginRepository from "../repositories/login/login-repositorie";
import PersonRepository from "../repositories/person/person-repositorie";
import PersonRoleRepository from "../repositories/person/person-role-repositorie";
import { generateHash } from "../utils/hashProvider";
import PersonContactRepository from "../repositories/person/person-contact-repositorie";
import AddressRepository from "../repositories/address/address-repositorie";
import AddressComplementRepository from "../repositories/address/address-complement-repositorie";

export default class CustomerService{
    private personRepository: PersonRepository;
    private personRoleRepository: PersonRoleRepository;
    private _loginRepository: LoginRepository;
    private _contactRepository: PersonContactRepository;
    private _addressRepository: AddressRepository;
    private _addressComplementRepository: AddressComplementRepository;

    constructor(){
        this.personRepository = new PersonRepository('user');
        this.personRoleRepository = new PersonRoleRepository('userRole');
        this._loginRepository = new LoginRepository('login');
        this._contactRepository = new PersonContactRepository('contact');
        this._addressRepository = new AddressRepository('address');
        this._addressComplementRepository = new AddressComplementRepository('addressComplement');
    }

    async createCustomer(data: CustomerCreateModel) : Promise<any> {

        const roleId = await this.personRoleRepository.findRoleByText("USER");

        if(!roleId){
            throw new Error("Role not found");
        };

        data.person.roleId = roleId.id;

        const isUserWithThisCPF = await this.personRepository.findByCpf(data.person.cpf);

        if(isUserWithThisCPF){
            throw new Error("User with this CPF already exists");
        }

        const userCreated = await this.personRepository.create(data.person);

        const passwordHashed = await generateHash(data.login.password);
        
        const userLoginCreated = await this._loginRepository.create(
            {
                userId: userCreated.id,
                password: passwordHashed,
                email: data.login.email
            }
        );

        if(!userLoginCreated){
            throw new Error("Error creating user login");
        }

        const userContact = await this._contactRepository.create(
            {
                cellPhone: data.contact.cellPhone,
                User: { connect: { id: userCreated.id } },
            }
        );

        if(!userContact){
            throw new Error("Error creating user contact");
        }

        const userAddress = await this._addressRepository.create(
            {
                cep: data.address.cep,
                User: { connect: { id: userCreated.id } },
            }
        );

        if(!userAddress){
            throw new Error("Error creating user address");
        }

        console.log(data.address);

        const addressComplement = this._addressComplementRepository.create({
            addressId: userAddress.id,
            state: data.address.state,
            city: data.address.city,
            neighborhood: data.address.neighborhood,
            street: data.address.street,
            number: +data.address.number,
            complement: data.address.complement
        });

        return addressComplement;
    }

}