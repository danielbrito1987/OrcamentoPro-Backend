import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CompanyService } from '../company/company.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: CompanyService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        console.log("--> Validando usuário");
        console.log("Usuário: ", username);
        console.log("Senha: ", pass);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            document: user.document
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                sub: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                document: user.document
            }
        };
    }
}