import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Type from './Type'
import { TypePropertyValue } from './TypePropertyValue'

@Entity('type_property')
export class TypeProperty extends BaseEntity {

    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @ManyToOne(() => Type, type => type.typeProperties)
    type: Type

    @OneToMany(() => TypePropertyValue, typePropertyValue => typePropertyValue.typeProperty, {eager: true})
    typePropertyValues: TypePropertyValue[]
}