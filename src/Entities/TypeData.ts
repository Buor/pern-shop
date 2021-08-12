import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import Type from './Type'

@Entity('type_data')
export class TypeData extends BaseEntity {

    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column({
        type: 'jsonb'
    })
    typeDataPairs: object

    @OneToOne(() => Type, type => type.typeData)
    type: Type
}