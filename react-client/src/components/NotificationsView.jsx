import React from 'react';


class NotificationsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      frequency: '',
      radius: '',
      newProjects: false,
      newEvents: false,
      email: false,
      textMessage: false,
    }
    this.handleNotificationSubmit = this.handleNotificationSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }
  handleNotificationSubmit(e) {
    e.preventDefault();
    this.setState({submitted: true})
  }

  render() {
    if(this.state.submitted) {
      return (
        <div className="notifications_page">
          Thank you for setting up notifications! <br />
          <button className="styled_button" onClick={((e) => {this.props.viewProjects(e) })} >Back to Projects</button>
        </div>
      )
    }
    return(
      <div className="notifications_page">
        <h1>
          Schedule notifications for projects and events in your area
        </h1>
        <form className="notifications_form" onSubmit={this.handleNotificationSubmit}>
          <label>
            What do you want to receive notifications for?<br />
            <input type="checkbox" name="newProjects" onChange={this.handleCheck} />
            New projects <br />
            <input type="checkbox" name="newEvents" onChange={this.handleCheck} />
            New events <br />
          </label>
          <label>
            What kind of notifications?<br />
            <input type="checkbox" name="email" onChange={this.handleCheck} />
            Emails<br />
            <input type="checkbox" name="textMessage" onChange={this.handleCheck} />
            Text Messages<br />
          </label>
          <label>
            Frequency:
            <select name="frequency" onChange={this.handleChange} >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label> <br />
          <label>
            Radius from home:
            <select name="radius" onChange={this.handleChange} >
              <option value="ten">10 miles</option>
              <option value="fifty">50 miles</option>
              <option value="hundred">100 miles</option>
            </select> <br />
          </label>
          <input type="submit" value="Submit" className="styled_button" />
        </form>
        <button className="styled_button" onClick={((e) => {this.props.viewProjects(e) })} >Back to Projects</button>
      </div>
    )
  }

}

export default NotificationsView