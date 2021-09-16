import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Product from "./Product";

@Entity('product_info')
export default class ProductInfo extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @Column()
    description: string;

    @ManyToOne(() => Product, product => product.productInfos)
    product: Product
}
