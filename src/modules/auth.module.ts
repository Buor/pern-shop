import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import User from '../entities/User'
import UserData from '../entities/UserData'
import Basket from '../entities/Basket'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [TypeOrmModule.forFeature([User, UserData, Basket])]
})
export class AuthModule {}