import { Module } from '@nestjs/common'
import { UserService } from '../Services/user.service'
import { UserController } from '../Controllers/user.controller'

@Module({
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {
}