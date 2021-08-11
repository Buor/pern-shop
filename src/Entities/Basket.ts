import { BaseEntity, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from "./User";
import Product from "./Product";

@Entity('basket')
export default class Basket extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @OneToOne(() => User, user => user.basket)
    user: User

    @ManyToMany(() => Product, product => product.baskets)
    products: Product[]
}
