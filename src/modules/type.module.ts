import { Module } from '@nestjs/common'
import { TypeController } from '../controllers/type.controller'
import { TypeService } from '../services/type.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import Type from '../entities/Type'
import { TypeProperty } from '../entities/TypeProperty'
import { TypePropertyValue } from '../entities/TypePropertyValue'

@Module({
    controllers: [TypeController],
    providers: [TypeService],
    imports: [TypeOrmModule.forFeature([Type, TypeProperty, TypePropertyValue])]
})
export class TypeModule {}