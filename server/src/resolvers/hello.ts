import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver{
    @Query(_returns => String)     // trả về kiểu dữ liệu string
    hello() {
        return 'hello';
    }
}