import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common"
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { UpdateUserDto } from "./dto/UpdateUserDto.dto copy";
import { UserService } from "./user.service";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { PasswordHasherPipe } from "src/pipes/password-hasher";
import { AuthGuard } from "../auth/auth.guard";
import { UserRequest } from "../auth/interfaces/userRequest.interface";

@UseGuards(AuthGuard)
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
    async update(@Req() request: UserRequest, @Body() dto: UpdateUserDto) {
        return this.userService.update(request.user.sub , dto);
    }

    @Delete('/:id')
    async delete(@Req() request: UserRequest,) {
        return this.userService.delete(request.user.sub);
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

