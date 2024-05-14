import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService{
    private users: UserEntity[] = [];

    async create(user: UserEntity){
        this.users.push(user);
        console.log(this.users);
    }

    async findByEmail(email: String){
        const emailExists = this.users.find(
            user => user.email === email
        );
        return emailExists !== undefined;
    }
}