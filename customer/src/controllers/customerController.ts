import { Request, Response } from 'express';
import CustomerService from '../services/customerService';

const createCustomer = async (req: Request, res: Response) => {
    try{
        const customerService = new CustomerService();

        const data = await customerService.createCustomer();

        // return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error){
        // res.status(500).json(ApiResponse.error(error.message));
    }
}