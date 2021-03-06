import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import {Chat} from '../api/chat';
import PrivateHeader from './PrivateHeader';
// import {Session} from 'meteor/session';


//USER CLICKS MESSAGE BUTTON -> TAKEN TO ONE ON ONE PAGE WITH PERSON WHERE TEHEY CAN MESSAGE
    //your userId and their userId is stored in document, where messages are isApproved

//ALL MESSAGES PAGE WHERE THEY CAN SEE THE CHATS WITH EVERYONE THEY MESSAGED
    //pull up all chats where the userId matches yours as the sender

export default class MessagingRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messages:[]
    };
  }

  // componentWillMount() {
  // Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
  //
  // }

  //needs to display all msges, may need session to constantly update
    displayMessages(){
        // console.log("ComponentDidMount fires AllPost");
        this.postTracker =  Tracker.autorun(() => {
            Meteor.subscribe('specificChatSubscription');
            const thisChat = Chat.find({senderId:Meteor.userId()}).fetch();
        });


    }

    render() {
      return (
        <div className="allWrapper">

              <div className = "wrapper wrapper-top">
                      <PrivateHeader subtitle="Chat Room" />

                      <nav className="navbar navbar-expand-md navbar-dark justify-content-center noMargin">
                              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                              </button>

                              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                        <ul className="navbar-nav">

                                          <div className="back_to_all_post">
                                                <Link to ="/home">All Post</Link>
                                                  <Link to ="/allChats">All Chats</Link>
                                          </div>
                                        </ul>
                              </div>
                    </nav>
              </div>

          <ChatComponent props={this.props}/>
          {this.displayMessages()}
        </div>
      );
    }


  }
