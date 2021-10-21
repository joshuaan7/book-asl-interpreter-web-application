const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!      
  }

  type RootQuery {
    events: [Event!]!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      return event
        .save()
        .then(result => {
          console.log(result);
          return { ...result._doc};
        })
        .catch(err => {
          console.log(err);
          throw err;
        })
    },
    graphiql: true
  }
}));

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.18rwo.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(collection)
  // perform actions on the collection object
  client.close();
});

// mongoose
//   //.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ycwj8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
//   .connect(`mongodb+srv://admin:D7BT7VUff5pmjMgA@cluster0-ycwj8.mongodb.net/sample_airbnb?retryWrites=true`)

//   .then(() => {
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   })

app.listen(3000);