import { Module } from '@nestjs/common'
import { TypeController } from '../Controllers/type.controller'
import { TypeService } from '../Services/type.service'

@Module({
    controllers: [TypeController],
    providers: [TypeService]
})
export class TypeModule {}