import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class PendingPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    };
  }

    approvePost(){
      Meteor.call('post.approve', this.props._id)
      console.log("approve post clicked");
    }

    //delete post
    deletePost(){
      Meteor.call('post.remove', this.props._id)
        console.log("delete post clicked");
    }


    render() {
      return (
        <div>
          <p>Description: {this.props.description} </p>
          <p>Original Poster ID: {this.props.userId} </p>
            <p>Poster's Username: {this.props.username} </p>

            <button onClick={this.approvePost.bind(this)}>Approve Post </button>


            <button onClick={()=>this.setState({isOpen:true})}>Delete Post</button>
          <Modal isOpen = {this.state.isOpen} contentLabel="Remove post">
                <p>Are you sure you want to delete this post, it will not be approved and be removed from the database? </p>

            <button onClick={this.deletePost.bind(this)}>Delete Post </button>
            <button onClick={()=>this.setState({isOpen:false})}>Cancel Delete Post</button>
          </Modal>


        </div>
      );
    }


  }
