import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

export enum UserRole {
    User = "User",
    Admin = "Admin"
}

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

    @Column('text')
    role: UserRole

    @OneToOne(() => User, user => user.userData)
    user: User
}
