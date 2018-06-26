import React from 'react';
// import {Session} from 'meteor/session';

import { Link } from 'react-router-dom';
import {Post} from '../api/post';
import PrivateHeader from './PrivateHeader';
import AddPostForm from './AddPostForm';

export default class AddPost extends React.Component {

    componentWillMount() {
      // Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }


    render() {
      return (
        <div>
              <div className = "wrapper wrapper-top">
                    <PrivateHeader subtitle="Add New Post" />

                      <nav className="navbar navbar-expand-md navbar-dark justify-content-center noMargin">
                              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                              </button>

                              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                        <ul className="navbar-nav">

                                          <div className="back_to_all_post">
                                                <Link to ="/home">Back to all post</Link>
                                          </div>

                                        </ul>
                              </div>
                    </nav>


              </div>

              <div className="wrapper">
                  <AddPostForm/>
              </div>

        </div>
      );
    }
  }
