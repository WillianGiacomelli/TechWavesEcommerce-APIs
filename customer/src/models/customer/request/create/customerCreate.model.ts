import AddressModel from "./address.model";
import ContactModel from "./contact.model";
import LoginModel from "./login.model";
import PersonModel from "./person.model"

export default class CustomerCreateModel{
    person: PersonModel;
    contact: ContactModel;
    address: AddressModel;
    login: LoginModel
}