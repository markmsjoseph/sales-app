import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Chat} from '../api/chat';
import {Post} from '../api/post';

export default class ChatComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg:[]
    };
  }


  //on mount we display the messages from previous time they chatted
  componentDidMount() {
          console.log("ComponentDidMount fires CHATCOMPONENT");
          this.postTracker =  Tracker.autorun(() => {

              //find all links which are approved. then call fetch on cursor to get all link documents back
              let yourID = Meteor.userId();
              let idTwo = this.props.props.location.pathname.split('t/')[1];
              const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
              // console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",yourID, ", \"receiverId:\"",idTwo,"});");
              // console.log(currentChat);

              const currentChat2 = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
              // console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",idTwo, ", \"receiverId:\"",yourID,"});");
              // console.log(currentChat2);

              if(!currentChat[0] && !currentChat2[0]){
                console.log("NO CHAT FOR BOTH USERS");
              }
              //THERE WAS A PREVIOUS CHAT SO WE NEED TO RETRIEVE MESSAGES
              else if(currentChat[0]){
                  // console.log("--------SENDER ID: ", currentChat[0].senderId);
                  const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
                  this.setState(()=>{
                    return{
                      msg:currentChat[0].messages
                    }
                  });
              }//end else

              else if(currentChat2[0]){
                  const currentChat = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                  this.setState(()=>{
                    return{
                      msg:currentChat[0].messages
                    }
                  });
              }//end else

          });//end tracker autorun


  }

  // componentWillMount(){
  //   console.log("component will mount chat");
  // }

  componentWillUnmount() {
    console.log("Component Unmount fires PostList");
    //video 69 15:18 called to stop component from getting updated
    this.postTracker.stop();
  }



  onSubmit(e){
    // console.log("");
        e.preventDefault();
        // console.log("State Array Before: ", this.state.msg);
        let newMessage = this.refs.senderMsg.value.trim();
        let userAndMessage = {message:newMessage, yourId:Meteor.userId()};

        // if nothing in input box and submit clicked return from function without doing anything
        if(!this.refs.senderMsg.value){
          console.log("Empty");
          return;
        }

        //IF THERE IS A MSG AND THE MESAGE ARRAY IS EMPTY, CREATE A NEW CHAT OTHERWISE WE READ DATA FROM THE OLD CHAT
        if(newMessage && this.state.msg.length == 0 ){
          console.log("---------------------------CREATE CHAT AND INSERT FIRST MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
              let userAndMessage = {message:newMessage, yourId:Meteor.userId()};
              let yourID = Meteor.userId();
              let idTwo = this.props.props.location.pathname.split('t/')[1];
              this.setState(()=>{
                return{
                  msg:[ userAndMessage]
                }
              });
              //create a chat only if person sends a msg and pass in the id of the person who is selling the item
              // console.log("ID",this.props.props.location.pathname.split('t/')[1]);
              Meteor.call('chat.create', this.props.props.location.pathname.split('t/')[1])
                  Meteor.call('chat.insertMsg',[yourID, idTwo, userAndMessage])
                console.log("GOING TO INSERT:", userAndMessage, "into chat of:", this.props.props.location.pathname.split('t/')[1]);
              this.refs.senderMsg.value = '';
              // console.log("STATE: ", this.state.msg);
              // let stateArray = this.state.msg;
              // Meteor.call('chat.insertMsg',[this.props.props.location.pathname.split('t/')[1], stateArray])
        }

        //ELSE IF THERE IS A MESSAGE AND THE ARRAY IS NOT EMPTY WE UPDATE THE DOCUMENT'S MESSAGE ARRAY
        if(newMessage && this.state.msg.length != 0){
        //  console.log("---------------------------INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
              let userAndMessage = {message:newMessage, yourId:Meteor.userId()};
              // console.log("--------new message : ", userAndMessage);
                this.setState((prevState)=>{
                  return{
                    msg:[...prevState.msg, userAndMessage]
                  }
                });
                // let stateArray = this.state.msg;
                // console.log("GOING TO INSERT:", userAndMessage, "into chat of:", this.props.props.location.pathname.split('t/')[1]);
                // Meteor.call('chat.insertMsg',[this.props.props.location.pathname.split('t/')[1], userAndMessage])



                let yourID = Meteor.userId();
                let idTwo = this.props.props.location.pathname.split('t/')[1];
                const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();
                console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",yourID, ", \"receiverId:\"",idTwo,"});");
                console.log(currentChat);

                const currentChat2 = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                console.log("DATABASE QUERY: db.chat.find({\"senderId:\"",idTwo, ", \"receiverId:\"",yourID,"});");
                console.log(currentChat2);


                //THERE WAS A PREVIOUS CHAT SO WE NEED TO RETRIEVE MESSAGES
                if(currentChat[0]){
                    // console.log("--------SENDER ID: ", currentChat[0].senderId);
                    const currentChat = Chat.find({senderId:yourID, receiverId:idTwo}).fetch();

                    Meteor.call('chat.insertMsg',[yourID, idTwo, userAndMessage])
                    console.log("1-----INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
                }//end else

                else {
                    const currentChat = Chat.find({senderId:idTwo, receiverId:yourID}).fetch();
                    Meteor.call('chat.insertMsg',[idTwo, yourID, userAndMessage])
                    console.log("2-----INSERT ANOTHER MSG: YOUR ID ", Meteor.userId(), "RECIEVER ID ",  this.props.props.location.pathname.split('t/')[1]);
                }//end else
        }
  }


  renderMessages(){
    return this.state.msg.map((post)=>{
      return <div>
                  <p>Id: {post.yourId}</p>
                  <p>{post.message}</p>
                  <br/>
            </div>
    })
  }



  render() {
    // console.log("rendering time");
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
              <input type="text" ref="senderMsg" placeholder="Enter Message"/>
              <button>Send Message </button>
        </form>

        {this.renderMessages()}

      </div>
    );
  }


  }
