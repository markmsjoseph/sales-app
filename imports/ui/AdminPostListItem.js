import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AdminPostListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    };
  }

    deletePost(){
      //call save method in post.js with 2 arguments
      Meteor.call('post.remove', this.props._id)
    }


    render() {
      return (
        <div>
          <p>Description: {this.props.description} </p>
          <p>Original Poster: {this.props.userId} </p>


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
