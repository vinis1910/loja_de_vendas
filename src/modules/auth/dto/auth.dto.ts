import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {

    @IsEmail(undefined, { message: 'O email informado é invalido'})
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vazia' })
    password: string

}
