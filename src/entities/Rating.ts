import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import User from "./User";
import Product from "./Product";

@Entity('rating')
export default class Rating extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    rate: number;

    @ManyToOne(() => User, user => user.ratings)
    user: User

    @ManyToOne(() => Product, product => product.ratings)
    product: Product
}
