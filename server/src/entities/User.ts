import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() //db table
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    //tạo column username
    @Column({unique: true})
    username!: string

    //tạo column email
    @Column({unique: true})
    email!: string

    //tạo column password
    @Column()
    password!: string

    //tạo column created_at
    @CreateDateColumn()
    createdAt!: Date

    //tạo column updated_at
    @UpdateDateColumn()
    updatedAt!: Date
}