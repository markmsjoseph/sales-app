import React from 'react';
import {Post} from '../api/post';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import PostListItem from './PostListItem';
import FlipMove from 'react-flip-move';
import {Session} from 'meteor/session';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
export default class AllPost extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        post:[]
      };
    }

    //called after stuff is rendered to the screen in render
    componentDidMount() {
      // console.log("ComponentDidMount fires AllPost");
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
          Meteor.subscribe('allPostSubscription');
          //find all links which are approved. then call fetch on cursor to get all link documents back
          const allPost = Post.find({isApproved:'yes'}).fetch();
          this.setState({post:allPost});
      });

    }



    // componentWillMount() {
    //   //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
    //   Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
    //
    // }
    //fires right before component is removed from screen
    componentWillUnmount() {
      // console.log("Component Unmount fires PostList");
      //video 69 15:18 called to stop component from getting updated
      this.postTracker.stop();
    }

    // (
    //   <div class="col-xs-12 col-sm-4 col-md-2 ">
    //     <PostListItem key={post._id}   {...post} />;
    //   </div>
    //
    // )
    renderPostListItems(){
      return this.state.post.map((post)=>{
        return <PostListItem key={post._id}   {...post} />;

      });
    }

    onSortByDesc(){
      const allPost = Post.find({isApproved:'yes'}, {sort:{price:-1}}).fetch();
      this.setState({post:allPost});
    }

    onSortByAsec(){
      const allPost = Post.find({isApproved:'yes'}, {sort:{price:1}}).fetch();
      this.setState({post:allPost});
    }

    handleSearch(e){
      e.preventDefault();
      const name = e.target.value.trim();
      console.log(name);

      if (name!=""){
          // console.log("NAME TO SEARCH", name);
          const allPost = Post.find({ $and:[{isApproved:'yes'}, {name: { '$regex' : name, '$options' : 'i' }} ] }).fetch();
          // console.log("SEARCH TERM", allPost);
          this.setState({post:allPost});
      }
      else{
        const allPost = Post.find({isApproved:'yes'}).fetch();
        this.setState({post:allPost});

      }


    }
    renderAdminPageButton(){
      // meteor.
      // var uniqueID = Meteor.users.find({}).fetch();
      // // var username = Meteor.users.find({_id: uniqueID});
      // console.log("USERNAMEEE", uniqueID);
      if(Meteor.userId() == "bpe7Kafu9xq3DFR2g"){

          return(
            <div className="  wrapper__post ">
              <Link to ="/adminPage">Admin Page</Link>
            </div>
          );

      }
    }


    render() {
      return (
        <div>

          <div className = "wrapper wrapper-top">
                      <PrivateHeader  title="Sell Your Stuff" shortDes="users should be able to see all post on this page. Post will contain a image, price and short description. Each post will a link to more details about it. EVERYONE CAN SEE EVERYTHING ON THIS PAGE " />
                      <p className = "logged-in-as">Logged in as:{this.state.username} </p>

                    <div class="row justify-content-center">
                      <nav className="navbar navbar-expand-md navbar-dark justify-content-center noMargin">
                              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                              </button>

                              <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                        <ul className="navbar-nav ">

                                          <Link className = "item-navlink" to ="/addPost">Add New Item To Sell</Link>
                                          <Link className = "item-navlink" to ="/savedPost">Saved Post</Link>
                                          <Link className = "item-navlink" to ="/allChats">All Chats</Link>
                                          <Link className = "item-navlink" to ="/managePost">Manage Your Post</Link>
                                          {this.renderAdminPageButton()}

                                        </ul>
                              </div>
                      </nav>
                    </div>

                      {/* <div className="wrapper-top-main-links">

                        </div> */}

                        <div class="row justify-content-center">

                                <button className=" sort_button1 " onClick={this.onSortByDesc.bind(this)}>Sort by Price Asc(Largest to Smallest)</button>
                            </div>
                          <div class="row justify-content-center">
                                <button className=" sort_button2 " onClick={this.onSortByAsec.bind(this)}>Sort by Price Desc(Smallest to Largest)</button>

                      </div>

                                  <div className="container-fluid noPadding">


                                                              <div class="row justify-content-center">
                                                                          <input id="myInput" className = ' search-form form-control form-control-lg ' type="text" placeholder="SEARCH" onChange={this.handleSearch.bind(this)}/><br/>
                                                                      </div>





                                  </div>

              </div>









            <div className = "wrapperAll">
              <div className="container-fluid">
                  <div className="row">
                  <FlipMove>

                    {this.renderPostListItems()}
                  </FlipMove>
                </div>
              </div>
            </div>
          </div>
      );
    }


  }
