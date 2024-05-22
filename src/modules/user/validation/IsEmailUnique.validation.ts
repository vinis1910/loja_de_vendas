import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserService } from "../user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class IsEmailUniqueValidation implements ValidatorConstraintInterface{
   
    constructor(private userService: UserService){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userEmailExists = await this.userService.findByEmail(value);
        return !userEmailExists;
    }
}

export const IsEmailUnique = (validationOptions: ValidationOptions) => {
    return (object: Object, propertie: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertie,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueValidation
        });
    }
}