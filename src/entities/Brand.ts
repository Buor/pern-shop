import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Product from './Product'
import Type from './Type'

@Entity('brand')
export default class Brand extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    brand: string

    @Column({nullable: true})
    brandLogo: string

    @OneToMany(() => Product, product => product.brand)
    products: Product[];

    @ManyToMany(() => Type, type => type.brands)
    @JoinTable()
    types: Type[]
}
