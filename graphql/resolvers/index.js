const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require("../../models/booking");

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

const singleEvent = async eventId => {
    try {
      const event = await Event.findById(eventId);
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {

    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                };
            });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id,
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                };
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    createEvent: async args => {
        try {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: "6176125277fbcd2a15c79037"
            });
            const result = await event.save();
            const creator = await User.findById(result._doc.creator.toString())
            if (!creator) {
                throw new Error('User does not exists.')
            }
            creator.createdEvents.push(event);
            await creator.save();
            return {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email });
            if (user) {
                throw new Error('User already exists.');
            }
            const hashPassword = await bcrypt.hash(args.userInput.password, 12);
            const newUser = new User({
                email: args.userInput.email,
                password: hashPassword
            });
            const result = await newUser.save();
            return {
                ...result._doc,
                password: null,
                _id: result.id
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    bookEvent: async args => {
        try {
            const fectchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user: "5c3cc489a1f3273f984495ad",
                event: fectchedEvent
            });
            const result = await booking.save();
            return {
                ...result._doc,
                _id: result.id,
                event: singleEvent.bind(this, result._doc.event),
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString()
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    cancelBooking: async args => {
        try {
          const booking = await Booking.findById(args.bookingId).populate("event");
          const event = {
            ...booking.event._doc,
            _id: booking.event.id,
            creator: user.bind(this, booking.event._doc.creator)
          };
          await Booking.deleteOne({ _id: args.bookingId });
          return event;
        } catch (err) {
          console.log(err);
          throw err;
        }
      }
}