import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne, OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import Product from './Product'
import Brand from './Brand'
import { TypeEntry } from './TypeEntry'

@Entity('type')
export default class Type extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string

    @Column({nullable: true})
    typeLogo: string

    @OneToMany(() => TypeEntry, typeData => typeData.type, {
        eager: true
    })
    typeEntries: TypeEntry[]

    @ManyToOne(() => Product, product => product.type)
    products: Product[]

    @ManyToMany(() => Brand, brand => brand.types, {
        eager: true
    })
    brands: Brand[]
}
