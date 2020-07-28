import React from 'react';

function AboutUs (props) {
  return (
    <div className="about_us_page">
      <div className="about_us_description">
      <p>
        Cleaner and Greener is a global initiative to clean up areas that have been heavily polluted with litter or illegal dumping. We aim to empower community members to take control of cleanup in their neighborhoods and increase community pride.
      </p>
      <p>
        To get started, create an account and view projects in your area. You can visit the areas alone to help clean them up, or join other Cleaners at scheduled events by RSVPing on the event's page. By attending events and logging time at a project you will earn leaf badges for your profile.
      </p>
      <b>Some things to remember when visiting projects or attending events:</b><br />
      <ul>
        <li>You are responsible for your own safety</li>
        <li>Bring heavy duty gloves</li>
        <li>Bring your own trash bags</li>
        <li>Trash pickers are helpful to avoid back injury</li>
      </ul>
      <p>
        When a project has been completed, the project can be marked as Clean by the project owner. This will add a leaf to the map, and over time our map will become "littered" with green!
      </p>
      <p>
        To keep up to date with projects in your area, turn on notifications and receive messages either daily, weekly, or monthly on new projects and scheduled events within in your designated radius.
      </p>
      </div>
      <button className="styled_button" onClick={((e) => {props.viewProjects(e)})}>Back to Projects</button>
    </div>
  )
}

export default AboutUs;