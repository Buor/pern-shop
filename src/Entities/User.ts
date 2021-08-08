import { Column, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import UserData from './UserData'
import Basket from './Basket'
import Rating from './Rating'

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserData, userData => userData.user)
    @JoinTable()
    userData: UserData

    @OneToOne(() => Basket, basket => basket.user)
    @JoinTable()
    basket: Basket

    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[]
}
