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
import { TypeProperty } from './TypeProperty'
import { TypePropertyValue } from './TypePropertyValue'

@Entity('product')
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string;

    @Column()
    cost: number;

    @Column({default: 0})
    count: number;

    @Column({nullable: true})
    discountCost: number;

    @Column({nullable: true})
    img: string;

    @OneToMany(() => Rating, rating => rating.product, {
        eager: true
    })
    ratings: Rating[]

    @OneToMany(() => ProductInfo, productInfo => productInfo.product, {
        eager: true
    })
    productInfos: ProductInfo[]

    @ManyToOne(() => Brand, brand => brand.products, {
        eager: true
    })
    brand: Brand

    @ManyToOne(() => Type, type => type.products, {
        eager: true
    })
    type: Type

    @ManyToMany(() => Basket, basket => basket.products, {eager: true})
    @JoinTable()
    baskets: Basket[]

    @ManyToMany(() => TypePropertyValue, typePropertyValue => typePropertyValue.products, {eager: true})
    @JoinTable()
    typePropertyValues: TypePropertyValue[]
}
