import { Module } from '@nestjs/common'
import { TypeController } from '../controllers/type.controller'
import { TypeService } from '../services/type.service'

@Module({
    controllers: [TypeController],
    providers: [TypeService]
})
export class TypeModule {}