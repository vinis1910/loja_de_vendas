import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsEmailUnique, IsEmailUniqueValidation } from "../validation/IsEmailUnique.validation";


export class UpdateUserDto{

    @IsNotEmpty({message: 'O nome não deve ser vazio'})
    @IsOptional()
    name: string;
    
    @IsEmail(undefined, {message: 'O email informado não é valido'})
    @IsEmailUnique({message: 'O email informado ja existe'})
    @IsOptional()
    email: string;

    @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
    @IsOptional()
    password: string;
}