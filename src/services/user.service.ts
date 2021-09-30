import { HttpException, Injectable } from '@nestjs/common'
import User from '../entities/User'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne(id)
        if(!user)
            throw new HttpException(`User with id ${id} not found!`,400)
        return user
    }
}