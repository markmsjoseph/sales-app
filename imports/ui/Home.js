import React from 'react';

// import { Accounts } from 'meteor/accounts-base';

import AllPost from './AllPost';
// import AllChats from './AllChats';


export default class Home extends React.Component {


  constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }

    }

    render() {
      return (
        <div className="allWrapper">
            <AllPost />
        </div>
      );
    }


  }
