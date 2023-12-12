import { Field, InterfaceType } from "type-graphql";


@InterfaceType()

//Tạo một interface response trả về
export abstract class IMutationResponse{
    @Field()
    code!: number;
    @Field()
    success!: boolean;
    @Field({nullable: true})
    message?: string;
}