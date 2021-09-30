import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'
import Rating from './Rating'
import Brand from './Brand'
import Type from './Type'
import ProductInfo from './ProductInfo'
import Basket from './Basket'
import { TypePropertyValue } from './TypePropertyValue'

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number

    @Column()
    name: string

    @Column()
    cost: number

    @Column({ default: 0 })
    count: number

    @Column({ nullable: true })
    discountCost: number

    @Column({ nullable: true })
    img: string

    @OneToMany(() => Rating, rating => rating.product)
    ratings: Rating[]

    @OneToMany(() => ProductInfo, productInfo => productInfo.product)
    productInfos: ProductInfo[]

    @ManyToOne(() => Brand, brand => brand.products)
    brand: Brand

    @ManyToOne(() => Type, type => type.products)
    type: Type

    @ManyToMany(() => Basket, basket => basket.products)
    @JoinTable()
    baskets: Basket[]

    @ManyToMany(() => TypePropertyValue, typePropertyValue => typePropertyValue.products)
    @JoinTable()
    typePropertyValues: TypePropertyValue[]
}
