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
      arrayWithoutDuplicates:[]
    };
  }



  componentDidMount() {
          console.log("ComponentDidMount fires CHATCOMPONENT");
          this.postTracker =  Tracker.autorun(() => {
            // Meteor.subscribe('getAllUsers');
            // let users = Meteor.users.find({}).fetch();
            // console.log("NEW USERSSSSS", users);

            Meteor.subscribe('specificChatSubscription');
            const thisChat = Chat.find({senderId:Meteor.userId()}).fetch();
            console.log("THIS CHAT:" , thisChat);
            // console.log("THIS CHAT:0" , thisChat[0]);
            allChatsArray = thisChat;

            const thatChat = Chat.find({receiverId:Meteor.userId()}).fetch();
            console.log("THAT CHAT:", thatChat);

            let allChatsArray = thisChat.concat(thatChat);
            this.setState(()=>{
              return{
                msg:allChatsArray
              }
            });
            console.log("ALL CHATS ARRAY", allChatsArray);
            console.log("STATE", this.state.msg, this.state.msg2);
              });//end tracker autorun

              //go through entire array,
              //check all senderids and receiver ids, add to new array, for each subsequent one check against new array to see if it is there already


  }


  removeDuplicates(){
    //filter creates a new array that pass a test
    let duplicatesArray = this.state.msg
    let duplicates = [];

    for(let i =0; i<duplicatesArray.length; i++){
      duplicates.push(duplicatesArray[i]._id);
    }

    var uniqueArray = duplicates.filter(function(elem, pos) {
        return duplicates.indexOf(elem) == pos;
    });

    console.log("ARRAY WITH NO DUPLICATES", uniqueArray);
    let arrayOfObjects = [];
    for(let i =0; i<uniqueArray.length; i++){
          //checks entire array
          var found = duplicatesArray.find(function(element) {
              //return the entire object that matches the //
              if(element._id == uniqueArray[i])
              return element;
          });
          //push found to new array
          arrayOfObjects.push(found);
    }
      console.log("Final ArRAY...........", arrayOfObjects);

      this.setState(()=>{
        return{
          arrayWithoutDuplicates:arrayOfObjects
        }
      });
  }


  renderMessages(){
    return this.state.arrayWithoutDuplicates.map((post)=>{

      return <div>
          <Link to ={`/chat/${post.senderId}`}>Go to chat wth <p>Id: {post._id}</p></Link>
                  <br/>
            </div>
    })
  }



  render() {
    return (
      <div>
        <Link to ="/home">Back to all post</Link>
        <h1>Messaging app</h1>
        {this.renderMessages()}

        <button onClick={this.removeDuplicates.bind(this)}>Show All Chats </button>
      </div>

    );
  }


  }
