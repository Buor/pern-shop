import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'
import Brand from './Brand'
import { TypeProperty } from './TypeProperty'

@Entity('type')
export default class Type {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @Column({nullable: true})
    typeLogo: string

    @OneToMany(() => TypeProperty, typeProperty => typeProperty.type, {
        onDelete: "CASCADE"
    })
    typeProperties: TypeProperty[]

    @ManyToOne(() => Product, product => product.type)
    products: Product[]

    @ManyToMany(() => Brand, brand => brand.types)
    brands: Brand[]
}
