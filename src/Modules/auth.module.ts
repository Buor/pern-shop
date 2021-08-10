import { Module } from '@nestjs/common';
import { AuthController } from '../Controllers/auth.controller';
import { AuthService } from '../Services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import User from '../Entities/User'
import UserData from '../Entities/UserData'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [TypeOrmModule.forFeature([User, UserData])]
})
export class AuthModule {}