const getAllCategories = async (req: Request, res: Response) => {
    try{
        const body  = req.body;

        const customerService = new CustomerService();

        const data = await customerService.createCustomer(body);

        return res.status(200).json(ApiResponse.success("", [data]));
    }catch(error: any){
        error
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export {createCustomer}