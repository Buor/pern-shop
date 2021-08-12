import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import Product from './Product'
import Brand from './Brand'
import { TypeData } from './TypeData'

@Entity('type')
export default class Type extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    type: string

    @Column({nullable: true})
    typeLogo: string

    @OneToOne(() => TypeData, typeData => typeData.type, {
        eager: true
    })
    @JoinColumn()
    typeData: TypeData

    @ManyToOne(() => Product, product => product.type)
    products: Product[]

    @ManyToMany(() => Brand, brand => brand.types, {
        eager: true
    })
    brands: Brand[]
}
