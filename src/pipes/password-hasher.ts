import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordHasherPipe implements PipeTransform{
    constructor(private configService: ConfigService){}
    
    async transform(password: string) {
        const salt = this.configService.get<string>('SALT_PASSWORD')

        const hashedPassword = await bcrypt.hash(password, salt!);
        
        return hashedPassword;
    }
}