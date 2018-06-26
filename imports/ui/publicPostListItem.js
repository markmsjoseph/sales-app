import React from 'react';
import { Meteor } from 'meteor/meteor';
import { CSSTransitionGroup } from 'react-transition-group';

export default class PostListItem extends React.Component {


    constructor(props) {
      super(props);
    }


    render() {
          return (

              <div className = "wrapper wrapper__post">

                    <div className="item">
                      <h3 className='item__post-title'> {this.props.name} </h3>
                      <p className='item__post-price'> Price: ${this.props.price} </p>
                      <p className='item__post-postedBy'> Posted by: {this.props.username} </p>
                      <img className ='item__image' src={this.props.image}/><br/>
                        <p className='item__post-description'>{this.props.description} </p>
                    </div>

              </div>
          );
    }

  }
