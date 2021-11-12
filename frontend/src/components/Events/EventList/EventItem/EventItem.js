import React from "react";

import "./EventItem.css";

const eventItem = props => (
  <li key={props.eventId} className="events__list-item">
    <h1>{props.title}</h1>
  </li>
);

export default eventItem;