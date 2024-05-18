import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService} from "./user.service";
import { IsEmailUniqueValidation } from "./validation/IsEmailUnique.validation";
import { UserEntity } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, IsEmailUniqueValidation],
})
export class UserModule {

}