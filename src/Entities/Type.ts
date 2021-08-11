import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'
import Brand from './Brand'

@Entity('type')
export default class Type extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    type: string

    @Column({nullable: true})
    typeLogo: string

    @ManyToOne(() => Product, product => product.type)
    products: Product[]

    @ManyToMany(() => Brand, brand => brand.types)
    brands: Brand[]
}
