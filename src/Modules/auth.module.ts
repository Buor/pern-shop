import { Module } from '@nestjs/common';
import { AuthController } from '../Controllers/auth.controller';
import { AuthService } from '../Services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import User from '../Entities/User'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [TypeOrmModule.forFeature([User])]
})
export class AuthModule {}