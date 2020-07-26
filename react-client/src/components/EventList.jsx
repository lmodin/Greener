import React from 'react';
import EventListItem from './EventListItem.jsx'

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      events: []
    }
  }

  componentDidMount() {
    let name = this.props.project.name.split(' ').join('_');
    fetch(`/events/${name}`)
      .then(results => results.json())
      .then(events => {
        this.setState({
          events: events,
          isLoaded: true
        })
      })
  }


  render() {
    if (this.state.isLoaded) {
      return (
        <ul className="project_view_event_list">
          {this.state.events.map(event => (
            <a onClick={((e) => this.props.viewEvent(e, event))}>
              <EventListItem event={event} />
            </a>
          ))}
        </ul>
      )
    } else {
      return (<div>Loading events</div>)
    }
  }
}

export default EventList;