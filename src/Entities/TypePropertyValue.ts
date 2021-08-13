import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'
import { TypeProperty } from './TypeProperty'

@Entity()
export class TypePropertyValue extends BaseEntity{
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @ManyToOne(() => TypeProperty, typeProperty => typeProperty.typePropertyValues)
    typeProperty: TypeProperty

    @ManyToMany(() => Product, product => product.typePropertyValues)
    products: Product[]
}