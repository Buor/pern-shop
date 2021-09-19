import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import UserData from './UserData'
import Basket from './Basket'
import Rating from './Rating'

@Entity('user')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserData, userData => userData.user)
    @JoinColumn()
    userData: UserData

    @OneToOne(() => Basket, basket => basket.user, {
        eager: true
    })
    @JoinColumn()
    basket: Basket

    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[]
}