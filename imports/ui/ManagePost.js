import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import PrivateHeader from './PrivateHeader';

export default class ManagePost extends React.Component {

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }


    render() {
      return (
        <div>
          <PrivateHeader title="Edit or Delete Post" shortDes="users can edit details of post on this page and can delete a post. ONLY SPECIFIC USER CAN SEE THIS PAGE "/>
              <Link to ="/home">Back to all post</Link>

              <EditPost />

        </div>
      );
    }
  }
