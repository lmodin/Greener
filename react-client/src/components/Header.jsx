import React from 'react';

function Header (props) {

  return (
    <div className="header">
      <div className="header_left">
        Cleaner <br />& Greener
      </div>
      <div className="header_right">
        <button className="header_button">login</button><br />
        <button className="header_button" onClick={((e) => {props.viewAboutUs(e)})}>about us</button>
      </div>
    </div>
  )
}

export default Header