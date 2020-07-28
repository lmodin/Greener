import React from 'react';

class RSVPView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      people: 1,
      submitted: false
    };
    //console.log('RSVP View props: ', props)
    this.handleChange = this.handleChange.bind(this);
    this.handleRSVPSubmit = this.handleRSVPSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleRSVPSubmit(e) {
    e.preventDefault();
    var rsvp = {
      event: this.props.event._id,
      people: this.state.people,
      name: this.state.name
    }
    fetch('./RSVP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rsvp),
    })
      .then(this.setState({submitted: true}))
  }

  render () {
    if (this.state.submitted) {
      return (
        <div className="rsvp_page">
          Thank you for RSVPing to {this.props.event.name} <br />
          <button className="styled_button" onClick={((e) => this.props.refreshProjects(e, this.props.project))}>Return to Project</button>
        </div>
      )
    }
    return (
      <div className="rsvp_page">
       <h1>RSVP to the {this.props.event.name} event</h1>
       <form className="rsvp_form" onSubmit={this.handleRSVPSubmit}>
         <label>
           Name:
           <input type="text" name="name" onChange={this.handleChange}/>
         </label><br />
         <label>
           Number of Cleaners:
           <input type="number" name="people" onChange={this.handleChange} />
         </label><br />
         <input type="submit" value="RSVP" className="styled_button"/>
       </form><br />
       Reminder for cleaners: You are responsible for your own safety, and for bringing your own equipment. <br />
       We recommend you bring sturdy gloves, trash pickers, several heavy duty trash bags, water and food.<br />
       <button className="styled_button" onClick={((e) => this.props.viewEvent(e, this.props.event, this.props.project))}>Cancel</button>
      </div>
    )
  }
}

export default RSVPView;