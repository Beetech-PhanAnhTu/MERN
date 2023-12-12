//biến môi trường
require('dotenv').config()
import 'reflect-metadata'
//import thuư viện express
import express from 'express'

import { createConnection } from 'typeorm'
import { User } from './entities/User'
import { Post } from './entities/Post'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './resolvers/hello'
import { UserResolver } from './resolvers/user'
const cors = require('cors');

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app:any = express()

    app.use(cors());

    //Tạo apollo server
    const apolloServer = new ApolloServer({
        schema: await buildSchema({resolvers: [HelloResolver, UserResolver], validate: false})
    })

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false })

    const PORT = process.env.DB_PORT || 4000;

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}. GraphQL Server started on http://localhost:${PORT}${apolloServer.graphqlPath}`))

}

//catch error
main().catch(error => console.log(error));