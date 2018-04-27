import React from 'react';


import { Link } from 'react-router-dom';
import {Post} from '../api/post';
import PrivateHeader from './PrivateHeader';
import AddPostForm from './AddPostForm';

export default class AddPost extends React.Component {

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }


    render() {
      return (
        <div>
          <PrivateHeader title="Add Your Post" shortDes="users should be able to upload their post data from this page. EVERYONE CAN GO TO THIS PAGE" />
          <Link to ="/home">Back to all post</Link>

          <AddPostForm/>


        </div>
      );
    }
  }
