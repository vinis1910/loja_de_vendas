import { UUID } from "crypto";


export class UserEntity{
    id: UUID;
    name: String;
    email: String;
    password: String;
}