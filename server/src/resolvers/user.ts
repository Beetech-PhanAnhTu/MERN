import argon2 from "argon2";
import { User } from "../entities/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UserMutationResponse } from "../types/userMutationResponse";

@Resolver()
export class UserResolver{
    @Mutation(_returns => UserMutationResponse)
    async register(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('password') password: string
    ): Promise<UserMutationResponse> {
        try {
            //kiểm tra user đã tồn tại
            const existingUser = await User.findOne({
                where: [{username}, {email}] // Điều kiện tìm kiếm thông qua trường 'username', 'email'
            })
            
            if(existingUser){
                return {
                    code: 400,
                    success: false,
                    message: "Duplicate username and email",
                    errors: [
                        {field: existingUser.username == username ? 'username' : 'email', 
                        message: `${existingUser.username === username ? 'Username' : 'Email'} already taken`}
                    ]
                }
            }

            const hashedPassword = await argon2.hash(password)

            //tạo user mới
            const newUser = User.create({
                username,
                email,
                password: hashedPassword
            })

            return {
                code: 200,
                success:true,
                message: "User registration successful",
                user: await User.save(newUser)
            }

        } catch (error) {
            console.log(error.message);
            return {
                code: 500,
                success: false,
                message: `Enternal Error`
            }         
        }
    }

}