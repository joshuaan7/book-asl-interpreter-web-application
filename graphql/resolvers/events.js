const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require("./merge");

module.exports = {

  events: async () => {
      try {
          const events = await Event.find();
          return events.map(event => {
              return transformEvent(event);
          });
      }
      catch (err) {
          console.log(err);
          throw err;
      }
  },


  createEvent: async args => {
      const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
          creator: "6180122abb989a28fb71d74d" //"617b7adcdeb6f7f7fb6ce991"
      });

      console.log("BEGIN");
      console.log(args.eventInput.title);
      console.log(args.eventInput.description);
      console.log(args.eventInput.creator);
      console.log(args.eventInput.price);
      console.log(args.eventInput.date);


      console.log("END");

      let createdEvent;
      try {
          const result = await event.save();
          createdEvent = transformEvent(result);
          console.log(result._doc.creator.toString());
          console.log(result.creator.toString());
          const creator = await User.findById(result._doc.creator.toString());
          console.log("PASSED");

          if (!creator) {
              throw new Error('User does not exists.')
          }
          console.log("Passed?");

          creator.createdEvents.push(event);
          await creator.save();
          return createdEvent;
      }
      catch (err) {
          console.log(err);
          throw err;
      }
  }  
}