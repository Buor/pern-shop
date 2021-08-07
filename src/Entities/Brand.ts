import {Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Product from "./Product";
import Type from "./Type";

@Entity('brand')
export default class Brand {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @OneToMany(() => Product, product => product.brand)
    products: Product[];

    @ManyToMany(() => Type, type => type.brands)
    @JoinTable()
    types: Type[]
}
