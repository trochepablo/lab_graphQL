const express = require('express');
const e_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`

    type Query{
        getUsers: [user]
    }

    type Mutation{
        agregarUsuario(name:String, age:String):user
    }

    type user{
        name: String,
        age: String
    }
`);

let users = [];

const resolver = {
    agregarUsuario: args => { 
        let userAdd = {name: args.name, age: args.age};
        users.push(userAdd);
        return userAdd;
    },
    getUsers: users
}

const app = express();
app.use('/graphql', e_graphql({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

app.listen(3000, () => console.log('tamoactivo ATR!'));
