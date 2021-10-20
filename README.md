# book-asl-interpreter-web-application
Northeastern University Enabling Engineering Project: ASL Interpreter Booking Web App

By: Fatema Janahi, Julian Lechner, Joshua An.


## Steps everyone needs complete to set up environment.
In the command line:

### Setting up initial node packages
* `npm init`
* You will be promted with fields to fill in, hit enter on your keyboard (leave everything blank/as is).

* You will be then asked `Is this OK? (yes)`, and enter `yes` on your keyboard.

* `npm install --save express body-parser`
* `npm i --save-dev nodemon`


### Setting up GraphQL
`npm install --save express-graphql graphql`

## Packages to install
Visual representation of our database content.

https://chrome.google.com/webstore/detail/chromeiql/fkkiamalmpiidkljmicmjfbieiclmeij?hl=en

Within ChromeiQL, enter `http://localhost:3000/graphql` in "Set endpoint" tab.

## To run program
`nodemon app.js` *should be using nodemon instead of node, because it auto-refreshes everytime you save new changes.*

`npm start` *don't think this is necessary if nodemon is set up correctly*

* To view, either `curl localhost:3000` in command line, or open `http://localhost:3000/`
