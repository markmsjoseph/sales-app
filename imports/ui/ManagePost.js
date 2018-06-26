import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import PrivateHeader from './PrivateHeader';
// import {Session} from 'meteor/session';

export default class ManagePost extends React.Component {

    componentWillMount() {
        // Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
    }


    render() {
      return (
          <div className="allWrapper">
          <div className = "wrapper wrapper-top">
                <PrivateHeader title="Sell Your Stuff" subtitle="Edit or Delete Post" />
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
              <EditPost />

        </div>
      );
    }
  }
