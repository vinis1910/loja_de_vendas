import { Body, Controller, Get, Post } from "@nestjs/common"
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { randomUUID } from "crypto";

@Controller('/users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() dto: CreateUserDto){
        const user = new UserEntity();

        user.id = randomUUID();
        user.email = dto.email;
        user.name = dto.name;
        user.password = dto.password;

        this.userService.create(user);
        return {id: user.id};
    }

    @Get()
    async listAll(){
        return 'teste controller create';
    }

}

