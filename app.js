const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*'); //everyone from anywhere can access
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS'); //allow people to use POST,GET,OPTION methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //control what headers are sent to server

  // valid send 
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();

});

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
})
);

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.18rwo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  })  