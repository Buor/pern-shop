import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
