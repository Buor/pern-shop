import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Type from './Type'

@Entity('type_data')
export class TypeEntry extends BaseEntity {

    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @Column({
        type: 'text',
        array: true
    })
    values: string[]

    @ManyToOne(() => Type, type => type.typeEntries)
    type: Type
}