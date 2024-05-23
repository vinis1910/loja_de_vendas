import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/userPayload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`O usuário com email ${email} não foi encontrado`);
    }

    const isUserAuthenticated = await this.validatePassword(password, user.password);
    
    if (!isUserAuthenticated) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }
    
    const payload: UserPayload = this.createPayload(user);
    return this.generateToken(payload);
  }

  private async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private createPayload(user: { id: string; name: string }): UserPayload {
    return {
      sub: user.id,
      userName: user.name,
    };
  }

  private async generateToken(payload: UserPayload): Promise<{ access_token: string }> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }
}
