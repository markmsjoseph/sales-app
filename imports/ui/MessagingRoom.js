import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import ChatComponent from './ChatComponent';
import {Chat} from '../api/chat';


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

  //needs to display all msges, may need session to constantly update
    displayMessages(){
        console.log("ComponentDidMount fires AllPost");
        this.postTracker =  Tracker.autorun(() => {
            Meteor.subscribe('specificChatSubscription');
            const thisChat = Chat.find({senderId:Meteor.userId()}).fetch();
        });
    }

    render() {
      return (
        <div>
          <Link to ="/allChats">All Chats</Link>
          <h1>Messaging app</h1>
          <ChatComponent props={this.props}/>
          {this.displayMessages()}
        </div>
      );
    }


  }
