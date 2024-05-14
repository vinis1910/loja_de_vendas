import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService} from "./user.service";
import { IsEmailUniqueValidation } from "./validation/IsEmailUnique.validation";


@Module({
    controllers: [UserController],
    providers: [UserService, IsEmailUniqueValidation],
})
export class UserModule {

}