import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import {Chat} from '../api/chat';


//Pull from database all chats where either sender or reciever match id
export default class AllChats extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      msg:[],
      arrayWithoutDuplicates:[],
        currentChatIDName:""
    };
  }


  //find all chats where you, the current user is either the sender and reciever
  componentDidMount() {
    console.log();
    console.log("YOUR ID IS:",Meteor.userId());
          this.postTracker =  Tracker.autorun(() => {

                  if(Meteor.user()){
                    this.setState(()=>{
                      return{
                        currentChatIDName:Meteor.user().username
                      }
                    });
                  }
                  Meteor.subscribe('specificChatSubscription');

                  //find chats where you are the sender
                  const thisChat = Chat.find({senderId:Meteor.userId()}).fetch();
                  console.log("THIS CHAT:" , thisChat);

                  //find chats where you are the reciever
                  const thatChat = Chat.find({receiverId:Meteor.userId()}).fetch();
                  console.log("THAT CHAT:", thatChat);

                  //save results where you are sender in an array and join it with the array where you are the reciever
                  allChatsArray = thisChat;
                  let allChatsArray = thisChat.concat(thatChat);

                  //state msg will contain array, but some chats will be duplicates
                  this.setState(()=>{
                    return{
                      msg:allChatsArray
                    }
                  });
                  // console.log("ALL CHATS ARRAY", allChatsArray);
                  // console.log("STATE", this.state.msg, this.state.msg2);

          });//end tracker autorun

  }

  //
  // removeDuplicates(){
  //   //filter creates a new array that pass a test
  //   let duplicatesArray = this.state.msg
  //   let duplicates = [];
  //
  //   for(let i =0; i<duplicatesArray.length; i++){
  //     duplicates.push(duplicatesArray[i]._id);
  //   }
  //
  //   var uniqueArray = duplicates.filter(function(elem, pos) {
  //       return duplicates.indexOf(elem) == pos;
  //   });
  //
  //   console.log("ARRAY WITH NO DUPLICATES", uniqueArray);
  //   let arrayOfObjects = [];
  //   for(let i =0; i<uniqueArray.length; i++){
  //         //checks entire array
  //         var found = duplicatesArray.find(function(element) {
  //             //return the entire object that matches the //
  //             if(element._id == uniqueArray[i])
  //             return element;
  //         });
  //         //push found to new array
  //         arrayOfObjects.push(found);
  //   }
  //     console.log("Final ArRAY with no duplicates...........", arrayOfObjects);
  //
  //     this.setState(()=>{
  //       return{
  //         arrayWithoutDuplicates:arrayOfObjects
  //       }
  //     });
  // }


  renderMessages(){
    return this.state.msg.map((post)=>{
      //if the current user's name is the same as the name of the person who sent the message, use the reciever's name instead
      let name = post.recieverIdName;
      let id = post.senderId;
      if (post.recieverIdName == this.state.currentChatIDName ){
        name = post.senderIdName
        id = post.receiverId
      }
      return <div>
          <Link to ={`/chat/${id}`}> <p>Go to chat with </p><h4>{name}</h4></Link>
                  <br/>
            </div>
    })
  }

    //
    // <button onClick={this.removeDuplicates.bind(this)}>Show All Chats </button>
  render() {
    return (
      <div>
        <Link to ="/home">Back to all post</Link>
        <h1>Messaging app</h1>
        {this.renderMessages()}


      </div>

    );
  }


  }
