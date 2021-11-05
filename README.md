# book-asl-interpreter-web-application
Northeastern University Enabling Engineering Project: ASL Interpreter Booking Web App

By: Fatema Janahi, Julian Lechner, Joshua An.

# Tutorial Info
* https://documentation.peelmicro.info/other/graphql-graphql-react-event-booking.html#_2-api-design-project-setup-8-32
* https://www.youtube.com/watch?v=7giZGFDGnkc

---
# Steps everyone needs complete to set up environment.
Run commands in the command line:

## Setting up initial node packages
* `npm init`
* You will be promted with fields to fill in, hit enter on your keyboard (leave everything blank/as is).

* You will be then asked `Is this OK? (yes)`, and enter `yes` on your keyboard.

* `npm install --save express body-parser`
* `npm i --save-dev nodemon`
  * in case the above command doesn't work, do `npm install -g nodemon # or using yarn: yarn global add nodemon`
---

### GraphQL
* `npm install --save express-graphql graphql`

### Mongoose
* `npm i install mongoose`

### Yarn Package Manager
* Used for dealing with version dependency issues introduced from the frontend.
* `npm install --global yarn`

### bcryptjs
For hashing user passwords before storing them.
* `npm i bcryptjs`

### jsonwebtoken
For authentication.
* `npm i jsonwebtoken`
---
### ChromeiQL
Visual representation of our database content.

https://chrome.google.com/webstore/detail/chromeiql/fkkiamalmpiidkljmicmjfbieiclmeij?hl=en

Within ChromeiQL, enter `http://localhost:3000/graphql` in "Set endpoint" tab.

---
## To run program

### Need to run front-end server at the same time as the back-end server to connect to both.

`npm start` in both the `front-end` folder and the main directory

`nodemon app.js` *DON'T NEED IF USING npm start* should be using nodemon instead of node, because it auto-refreshes everytime you save new changes.*

* To view, either `curl localhost:3000` in command line, or open `http://localhost:3000/`

---
# Commands
## Using mutations to add to the database in ChromeiQL

`mutation {
  createEvent(eventInput:{
    title:"Title A",
    description: "This is another test A",
    price: 1.99,
    date: "2019"
  })
  {
    title
    description
  }
}`


## Using query to view the data from databases in ChromeiQL
`
query {
  events {
    title
    _id
    description
    price
  }
}
`


