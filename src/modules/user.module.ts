import { Module } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import User from '../entities/User'

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {
}