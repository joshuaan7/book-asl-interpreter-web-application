const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {

    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    bookEvent: async args => {
        try {
            const fectchedEvent = await Event.findById(args.eventId);
            const booking = new Booking({
                user: "617b7adcdeb6f7f7fb6ce991",
                event: fectchedEvent
            });
            const result = await booking.save();
            return transformBooking(result);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    cancelBooking: async args => {
        try {
            const booking = await Booking.findById(args.bookingId).populate("event");
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};