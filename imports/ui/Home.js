import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import AllPost from './AllPost';
// import AllChats from './AllChats';
import PrivateHeader from './PrivateHeader';



// <div className=" item wrapper__post ">
//     <Link to ="/managePost">Manage Your Post</Link>
// </div>



export default class Home extends React.Component {


    componentWillMount() {
        if(!Meteor.userId()) {
          console.log("No user but trying to go back: In ComponentDidMount from Link.js");
          this.props.history.push('/');
        }
        //if admin user, pass in prop to display admin page
    }

    renderAdminPageButton(){
      // meteor.
      // var uniqueID = Meteor.users.find({}).fetch();
      // // var username = Meteor.users.find({_id: uniqueID});
      // console.log("USERNAMEEE", uniqueID);
      if(Meteor.userId() == "RwJJ3FN7Ab5rwEupB"){
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


                      {this.renderAdminPageButton()}
            </div>




            <AllPost />
        </div>
      );
    }


  }
