import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Rating from "./Rating";
import Brand from "./Brand";
import Type from "./Type";
import ProductInfo from "./ProductInfo";
import Basket from "./Basket";

@Entity('product')
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string;

    @Column()
    cost: number;

    @Column({nullable: true})
    discountCost: number;

    @Column({nullable: true})
    img: string;

    @OneToMany(() => Rating, rating => rating.product)
    ratings: Rating[]

    @OneToMany(() => ProductInfo, productInfo => productInfo.product)
    productInfos: ProductInfo[]

    @ManyToOne(() => Brand, brand => brand.products)
    brand: Brand

    @ManyToOne(() => Type, type => type.products)
    type: Type

    @ManyToMany(() => Basket, basket => basket.products)
    baskets: Basket[]
}
