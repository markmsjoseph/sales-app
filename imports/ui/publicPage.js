import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
// import {Session} from 'meteor/session';
import AllPost from './AllPost';

import PublicAllPost from './publicAllPost';

export default class Home extends React.Component {


    componentWillMount() {
       // Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
       if (Meteor.userId()){
         console.log("Has user but trying to go to authenticated page: In ComponentDidMount from Login.js");
             this.props.history.push('/home');
       }

   }



    render() {
      return (
          <div className="allWrapper">
                    <PublicAllPost />
          </div>
      );
    }


  }
