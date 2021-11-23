import React from 'react';

import './BookingList.css';

const bookingList = props => (
  <ul className="bookings__list">
    {props.bookings.map(booking => {
        return (
            <li key={booking._id} className="bookings__item">
                <div className="bookings__item-data">
                    <b> {booking.event.title} {' '} </b>
                    for {' '}
                    {new Date(booking.createdAt).toLocaleDateString()} {' '}
                    <b> Requested by: </b> {' '} {booking.event.creator.email}
                </div>

                <div className="bookings__item-actions">
                    <button className="btn" onClick={props.onDelete.bind(this, booking._id)}>Cancel</button>
                </div>
            </li>
      );
    })}
  </ul>
);

export default bookingList;
