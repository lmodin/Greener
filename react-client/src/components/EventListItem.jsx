import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


function EventListItem (props) {
  return (
    <li className="event_list_item">
      <div className="event_list_item_name">
        {props.event.name}
      </div>
      <div className="event_list_description">
        {props.event.description}
      </div>
      <div className="event_list_date">
        <Moment>{props.event.data}</Moment>
      </div>
    </li>
  )
}


export default EventListItem;