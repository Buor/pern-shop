import { HttpException, Injectable } from '@nestjs/common'
import User from '../entities/User'

@Injectable()
export class UserService {
    async getUserById(id: string) {
        const user = User.findOne(id)
        if(!user)
            throw new HttpException(`User with id ${id} not found!`,400)
        return user
    }
}