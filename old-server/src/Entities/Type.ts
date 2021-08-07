import {Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Product from "./Product";
import Brand from "./Brand";

@Entity('type')
export default class Type {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @ManyToOne(() => Product, product => product.type)
    products: Product[]

    @ManyToMany(() => Brand, brand => brand.types)
    brands: Brand[]
}
