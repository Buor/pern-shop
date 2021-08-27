import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from '../Services/user.service'


@Controller('/user')
export class UserController {

    constructor(private readonly userService: UserService ) {
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getUserById(id)
    }
}