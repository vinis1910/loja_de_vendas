import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { ListUsersDTO } from "./dto/ListUsers.dto";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { randomUUID } from "crypto";
import { UpdateUserDto } from "./dto/UpdateUserDto.dto copy";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async listAll(){
        const savedUsers = await this.userRepository.find();
        const listUsers = savedUsers.map(
            (user) => new ListUsersDTO(user.id, user.name)
        )

        return listUsers;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });

        return user;
    }

    async create(dto: CreateUserDto){
        const user = new UserEntity();

        user.id = randomUUID();
        user.email = dto.email;
        user.name = dto.name;
        user.password = dto.password;

        this.userRepository.save(user);

        return user;
    }

    async update(id: string, dto: UpdateUserDto){
        await this.userRepository.update(id, dto);
    }

    async delete(id: string){
        await this.userRepository.delete(id);
    }


}