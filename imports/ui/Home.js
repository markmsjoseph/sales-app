import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import AllPost from './AllPost';
// import AllChats from './AllChats';
import PrivateHeader from './PrivateHeader';






export default class Home extends React.Component {


  constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }

    }

    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
          console.log("USERNAME-----------------------:", Meteor.user());
          if(Meteor.user()){
            this.setState(()=>{
              return{
                username:Meteor.user().username
              }
            });
          }
          else{
            console.log("No User");
          }
      });

    }

    renderAdminPageButton(){
      // meteor.
      // var uniqueID = Meteor.users.find({}).fetch();
      // // var username = Meteor.users.find({_id: uniqueID});
      // console.log("USERNAMEEE", uniqueID);
      if(Meteor.userId() == "HxL6yB4jb5Td5zEef"){

          return(
            <div className=" item wrapper__post ">
              <Link to ="/adminPage">Admin Page</Link>
            </div>
          );

      }
    }

    render() {
      return (
        <div>

            <PrivateHeader className = "title-bar" title="All Post" shortDes="users should be able to see all post on this page. Post will contain a image, price and short description. Each post will a link to more details about it. EVERYONE CAN SEE EVERYTHING ON THIS PAGE " />
            <p>Logged in as:{this.state.username} </p>
            <div className="wrapper__main-buttons">
                      <div className=" item wrapper__post ">
                        <Link to ="/addPost">Add New Item To Sell</Link>
                      </div>

                      <div className=" item wrapper__post ">
                          <Link to ="/savedPost">Saved Post</Link>
                      </div>

                      <div className=" item wrapper__post ">
                          <Link to ="/allChats">All Chats</Link>
                      </div>
                      <div className=" item wrapper__post ">
                          <Link to ="/managePost">Manage Your Post</Link>
                      </div>


                      {this.renderAdminPageButton()}
            </div>




            <AllPost />
        </div>
      );
    }


  }
