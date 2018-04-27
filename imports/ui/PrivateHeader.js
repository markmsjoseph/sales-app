import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }

  render() {
    return (
      <div className="title-bar">
        <div className="wrapper">
            <h1 className = "title-bar__font"> {this.props.title}</h1>
        </div>
        <button className = "logoutButton" onClick={this.onLogout.bind(this)}>Logout</button>

      </div>
    );
  }


  }
