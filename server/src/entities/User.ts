import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity() //db table
export class User extends BaseEntity{
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id!: number

    //tạo column username
    @Field()
    @Column({unique: true})
    username!: string

    //tạo column email
    @Field()
    @Column({unique: true})
    email!: string

    //tạo column password
    @Column()
    password!: string

    //tạo column created_at
    @Field()
    @CreateDateColumn()
    createdAt!: Date

    //tạo column updated_at
    @Field()
    @UpdateDateColumn()
    updatedAt!: Date
}