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
              <CSSTransitionGroup transitionName="tabLoad" transitionAppear={true} transitionAppearTimeout={800}  transitionLeave={false} >
                    <div className="item">
                      <h3 className='item__post-title'> {this.props.name} </h3>
                      <p> Price: ${this.props.price} </p>
                      <p> Posted by: {this.props.username} </p>
                      <img className ='item__image' src={this.props.image}/><br/>
                        <p>{this.props.description} </p>
                    </div>
                      </CSSTransitionGroup>
              </div>
          );
    }

  }
