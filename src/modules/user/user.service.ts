import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { ListUsersDTO } from "./dto/ListUsers.dto";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUserDto.dto copy";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async listAll(): Promise<ListUsersDTO[]> {
        const savedUsers = await this.userRepository.find();
        const listUsers = savedUsers.map(
            (user) => new ListUsersDTO(user.id, user.name)
        );

        return listUsers;
    }

    async findByEmail(email: string): Promise<UserEntity | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });

        return user;
    }

    async create(dto: CreateUserDto): Promise<UserEntity> {
        const userEntity = new UserEntity();

        Object.assign(userEntity, dto as UserEntity)

        await this.userRepository.save(userEntity);

        return userEntity;
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
        const userEntity = await this.userRepository.findOneBy({ id });

        if (!userEntity) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }

        Object.assign(userEntity, dto as UserEntity);

        return await this.userRepository.save(userEntity);
    }

    async delete(id: string): Promise<void> {
        const result = await this.userRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
    }
}
