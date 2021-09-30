import { Module } from '@nestjs/common'
import { TypeController } from '../controllers/type.controller'
import { TypeService } from '../services/type.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import Type from '../entities/Type'

@Module({
    controllers: [TypeController],
    providers: [TypeService],
    imports: [TypeOrmModule.forFeature([Type])]
})
export class TypeModule {}