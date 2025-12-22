import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() req: LoginDto) {
        // Aqui você deve validar o usuário manualmente ou usar o LocalAuthGuard
        const user = await this.authService.validateUser(req.username, req.password);
        if (!user) {
            throw new Error('Unauthorized');
        }
        return this.authService.login(user);
    }
}