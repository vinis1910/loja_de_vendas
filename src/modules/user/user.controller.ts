import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from "@nestjs/common"
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dto/UpdateUserDto.dto copy";
import { UserService } from "./user.service";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { PasswordHasherPipe } from "src/pipes/password-hasher";

@Controller('/users')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async create(
        @Body() { password, ...dto }: CreateUserDto,
        @Body('password', PasswordHasherPipe) hashedPassword: string,
    ) {

        const user = await this.userService.create({ ...dto, password: hashedPassword });
        return { id: user.id };
    }


    @Put('/:id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Get()
    @UseInterceptors(CacheInterceptor)
    async listAll() {
        return await this.userService.listAll();;
    }

    @Get('/by-email')
    @UseInterceptors(CacheInterceptor)
    async findByEmail(@Query('email') email: string): Promise<UserEntity> {
        return this.userService.findByEmail(email);
    }
}

