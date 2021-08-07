import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

@Entity('user_data')
export default class UserData {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column()
    phoneNumber: string;

    @OneToOne(() => User, user => user.userData)
    user: User
}
