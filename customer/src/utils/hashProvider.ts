import { compare, hash } from "bcryptjs";

const generateHash = async (password: string) => {
    return hash(password, 8);
}

const compareHash = async (password: string, hashedPassword: string) => {
    return compare(password, hashedPassword);
}

export { generateHash, compareHash };