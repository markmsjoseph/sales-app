import React from 'react';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import PrivateHeader from './PrivateHeader';
import UserComponent from './UserComponent';
import { Link } from 'react-router-dom';
import {Post} from '../api/post';
import PendingPost from './PendingPost';
import AdminPostListItem from './AdminPostListItem';
import FlipMove from 'react-flip-move';
import Modal from 'react-modal';
//everytime the session value changes, it will cause tracker autorun to run again thus enabling us to re render stuff, without
//sessions trackers autorun will not do this rerendering
import {Session} from 'meteor/session';

export default class AdminPage extends React.Component {




    constructor(props) {
      super(props);
      this.state = {
        users:[],
        allPendingPost:[],
        allPost:[],
        isOpen:false
      };
    }


    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
        if(!(Meteor.userId() == "ft8CNvQ7Txki9MPu6")){
          console.log("NOT AN ADMIN, redirecting to /");
          this.props.history.push('/home');
        }
    }


    //called after stuff is rendered to the screen in render
    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {

          //if the value of the checkbox below is set to the users checkbox, we find all users and set the state to display them
          if(Session.get('whatToDisplay') == "users"){
            //get all users and display them and set the state array to all users
            Meteor.subscribe('getAllUsers');
            let allUsers = Meteor.users.find().fetch();
            //set state to display all users
            this.setState({users:allUsers});
            //we need to clear the other 2 state arrays so just the users array will have values to be displayed
            this.setState({allPendingPost:[]});
            this.setState({allPost:[]});

          }
          else if(Session.get('whatToDisplay') == "pending"){
            //find all post that are not approved as yet and set the all post state array
            Meteor.subscribe('allPostSubscription');
            const allPendingPost = Post.find({isApproved:"no"}).fetch();
            this.setState({allPendingPost});
            this.setState({users:[]});
            this.setState({allPost:[]});

          }
          else if(Session.get('whatToDisplay') == "all"){
            Meteor.subscribe('allPostSubscription');
            const allPost = Post.find().fetch();
            this.setState({allPost});
            this.setState({allPendingPost:[]});
            this.setState({users:[]});

          }

      });
    }


    //fires right before component is removed from screen
    componentWillUnmount() {
      this.postTracker.stop();
      if(!Meteor.userId()) {
        console.log("No user but trying to go back: In ComponentDidMount from Link.js");
        this.props.history.push('/');
      }
    }


    displayUsers(){
        return this.state.users.map((post)=>{
          return <UserComponent key={post._id} userId={post._id}  email={post.emails[0].address} />;
        })
    }

    //DIsplays all post
    renderAllPendingPost(){
      return this.state.allPendingPost.map((post)=>{
        return <PendingPost key={post._id}  {...post} />;

      })
    }

    renderPostListItems(){
      return this.state.allPost.map((post)=>{
        return <AdminPostListItem key={post._id}  {...post} />;

      })
    }

    render() {
      return (
        <div>
            <p>Fix to show username also, pending post displays images, all post displays images</p>
            <PrivateHeader title="Admin Page" shortDes="admin can delete users from this page. can also review post before adding them to all post "/>
              <Link to ="/home">Back to HomePage</Link><br></br>
              <br/>
              <label>
                    <input type="radio" name="button" value="users" onChange={(e)=>{
                      Session.set('whatToDisplay', e.target.value);
                    }}/> All Users

                    <input type="radio" name="button" value="pending" onChange={(e)=>{
                      Session.set('whatToDisplay', e.target.value);
                    }}/> Pending Post

                    <input type="radio" name="button" value="all"onChange={(e)=>{
                      Session.set('whatToDisplay', e.target.value);
                    }}/> All Post
              </label>


              {this.renderAllPendingPost()}

              {this.displayUsers()}
              <FlipMove>
                  {this.renderPostListItems()}
              </FlipMove>
        </div>
      );
    }


  }
