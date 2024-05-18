import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common"
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { randomUUID } from "crypto";
import { UpdateUserDto } from "./dto/UpdateUserDto.dto copy";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('/users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto){

        const user = await this.userService.create(dto);
        return {id: user.id};
    }

    
    @Put('/:id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto){
        return this.userService.update(id, dto);
    }
    
    @Delete('/:id')
    async delete(@Param('id') id: string){
        return this.userService.delete(id);
    }

    @Get()
    async listAll(){
        return await this.userService.listAll();;
    }

    @Get('/by-email')
    async findByEmail(@Query('email') email: string): Promise<UserEntity> {
        return this.userService.findByEmail(email);
    }
}

