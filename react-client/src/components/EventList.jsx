import React from 'react';
import EventListItem from './EventListItem.jsx'

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      events: [],
      pastEvents: []
    }
  }

  componentDidMount() {
    let name = this.props.project.name.split(' ').join('_');
    fetch(`/events/${name}`)
      .then(results => results.json())
      .then(events => {
        let pastEvents = [];
        var now = new Date();
        for (var i = 0; i < events.length; i++) {
          if (events[i].date < now) {
            pastEvents.push(events[i]);
            events.slice(i, 1);
          }
        }
        this.setState({
          events: events,
          pastEvents: pastEvents,
          isLoaded: true
        })
      })
      .then()
  }


  render() {
    //If loaded, and events is empty:
    if (this.state.isLoaded && this.state.events.length === 0) {
      return (
        <div className="project_view_event_list">
          There aren't any events currently scheduled for this project. <br />
          To schedule an event, select New Event below.
        </div>
      )
    } else if (this.state.isLoaded) {
      return (
        <div className="project_view_event_list">
          Scheduled events for this project
          <ul>
            {this.state.events.map(event => (
            <a onClick={((e) => this.props.viewEvent(e, event))}>
              <EventListItem event={event} />
            </a>
          ))}
          </ul>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

export default EventList;