import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsEmailUnique, IsEmailUniqueValidation } from "../validation/IsEmailUnique.validation";


export class CreateUserDto{

    @IsNotEmpty({message: 'O nome não deve ser vazio'})
    name: String;
    
    @IsEmail(undefined, {message: 'O email informado não é valido'})
    @IsEmailUnique({message: 'O email informado ja existe'})
    email: String;

    @MinLength(6, {message: 'A senha deve ter no minimo 6 caracteres'})
    password: String;
}