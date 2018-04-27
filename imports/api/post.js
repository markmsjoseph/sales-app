import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Post = new Mongo.Collection('post');

if(Meteor.isServer){
  //meteor publish only runs on server not both client and server
  //publish takes a string and a function determining what data each client should have access too
  //must use es5 function because we need this binding
  Meteor.publish('specificPostSubscription', function(){
    //we get the user id because of the this binding from es5 functions, the user calling this publication will have that id
    return Post.find({userId:this.userId});
  })

  Meteor.publish('allPostSubscription', function(){
    return Post.find({});
  })
  Meteor.publish('getAllUsers', function(){
    return Meteor.users.find({});
  })


}

Meteor.methods({
      //we use ' ' to use the . operator on the object property video 73 4:50
      'post.insert'(array){
        console.log('INSERTING', array);
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        Post.insert({
          name:array[0],
          price:array[1],
          description:array[2],
          image:array[3],
          userId:this.userId,
          isApproved:'no',
          cart:[]
        })
      },

      //we use ' ' to use the . operator on the object property video 73 4:50
      'post.update'(array){
        console.log('Updating', array);
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        Post.update(
          {
            _id:array[3]
          },
          {$set:{
                    name:array[0],
                    price:array[1],
                    description:array[2],
                    isApproved : "no"
                }
          }
      )
      },


      'post.save'(ids){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        //update specific post where user id matches and push the id of the post you are saving to the cart array of this specific post item
        Post.update({_id : ids},
        {$push:{cart : this.userId}}
        )
      },

      'post.removeFromCart'(postId){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        //update specific post where user id matches and push the id of the post you are saving to the cart array of this specific post item
        Post.update({_id : postId},
        {$pull:{cart : this.userId}}
        )
      },
      'post.remove'(postId){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        //update specific post where user id matches and push the id of the post you are saving to the cart array of this specific post item
        Post.remove({_id : postId}
        )
      },
      'post.approve'(postId){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        //update specific post where user id matches and change value of no to yes
        Post.update({_id : postId},
        {$set:{isApproved : "yes"}}
        )
      },
      'users.removeUser'(userId){
        //if user is not logged in throw error
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }

        if(userId=="GaocWtwD2rhGXfLM9"){
          throw new Meteor.Error('Cannot Delete Admin');
        }
        //used to delete specific user
        Meteor.users.remove({_id : userId})
      }


});


//Drake
//kendric
//J Cole
//chance the rapper
//xxx tentacion
