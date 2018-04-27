import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Images} from '../api/images';

export default class AddPostForm extends React.Component {

//   componentDidMount() {
//           console.log("ComponentDidMount fires CHATCOMPONENT");
//           this.postTracker =  Tracker.autorun(() => {
//           Meteor.subscribe('getAllUsers');
//
//         });
// }

  onSubmit(e){
    const name = this.refs.nameRef.value.trim();
    const priceString = parseInt(this.refs.priceRef.value.trim());
    const price = priceString;
    const description = this.refs.descriptionRef.value.trim();
    const image = this.refs.imageRef.value.trim();
    // let users = Meteor.users.find({}).fetch();
    // let username = users[0].username;
    // console.log("NEW USERSSSSS", username);

    // var file = document.getElementById('myFile').files[0];
    // console.log("FILE TO INSERT:", file);
    // //g we're doing is passing the browser-provided File object
    // // to Images.insert(). This will create a FS.File from the File,
    // //link it with the Images FS.Collection, and then immediately begin uploading the data to the server with reactive progress updates.
    // Images.insert(file, function (err, fileObj) {
    //   if(err){
    //       console.log(err);
    //   }
    //   else {
    //     console.log("Everything went well");
    //   }
    //
    //   // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
    // });
    // console.log("Insert complete");

    e.preventDefault();
    if(description){
      //call meteor method post.insert with the data which is stored in description
      Meteor.call('post.insert', [name, price, description, image])
      // Meteor.call('image.insert', fileObj)
      //clear whatever value wa,s in inputbox
      this.refs.nameRef.value = '';
      this.refs.priceRef.value = '';
      this.refs.descriptionRef.value = '';
      this.refs.imageRef.value = '';
    }
     // var file = document.getElementById('myFile').files[0];
     // console.log("FILE", file);
    // if(file){
    //
    //     fsFile = new FS.file(file)
    //     console.log("Has image");
    //
    //     UserImages.insert(fsFile, function(err, result) {
    //       if(err){
    //         throw new Meteor.Error(err);
    //       }
    //       else {
    //         console.log("No error");
    //       }
    //     })
    // }


  }

  render() {
    return (
      <div>
      <div className="container centered">

                  <div className="col-lg-12 col-md-8 col-sm-12">
                      <form className=" form" onSubmit={this.onSubmit.bind(this)}>

                            <label >Post Name</label>
                            <input className = 'form-control form-control-lg' type="text" ref="nameRef" placeholder="Post Name"/><br/>

                            <label >Post Price</label>
                            <input className = 'form-control form-control-lg' type="text" ref="priceRef" placeholder="Enter Price"/><br/>

                            <label >Post Description</label>
                            <input className = 'form-control form-control-lg' type="text" ref="descriptionRef" placeholder="Enter Description"/><br/>

                            <label >Enter URL for post image</label>
                            <input id= "myFile" className = 'form-control form-control-lg' type="file" ref="imageRef"  placeholder= "Upload Image"/><br/>

                            <button className='btn btn-primary btn-lg'>Add Post </button>
                      </form>
                  </div>

              </div>
      </div>
    );
  }


  }















  // import React from 'react';
  // import { Meteor } from 'meteor/meteor';
  // import {UserImages} from '../api/images';
  //
  // export default class AddPostForm extends React.Component {
  //
  //
  //   onSubmit(e){
  //     const name = this.refs.nameRef.value.trim();
  //     const price = this.refs.priceRef.value.trim();
  //     const description = this.refs.descriptionRef.value.trim();
  //     const image = this.refs.imageRef.value.trim();
  //     console.log("image:", image);
  //     e.preventDefault();
  //     if(description){
  //       //call meteor method post.insert with the data which is stored in description
  //       Meteor.call('post.insert', [name, price, description, image])
  //       //clear whatever value was in inputbox
  //       this.refs.nameRef.value = '';
  //       this.refs.priceRef.value = '';
  //       this.refs.descriptionRef.value = '';
  //       this.refs.imageRef.value = '';
  //     }
  //      // var file = document.getElementById('myFile').files[0];
  //      // console.log("FILE", file);
  //     // if(file){
  //     //
  //     //     fsFile = new FS.file(file)
  //     //     console.log("Has image");
  //     //
  //     //     UserImages.insert(fsFile, function(err, result) {
  //     //       if(err){
  //     //         throw new Meteor.Error(err);
  //     //       }
  //     //       else {
  //     //         console.log("No error");
  //     //       }
  //     //     })
  //     // }
  //
  //
  //   }
  //
  //   render() {
  //     return (
  //       <div>
  //       <div className="container centered">
  //
  //                   <div className="col-lg-12 col-md-8 col-sm-12">
  //                       <form className=" form" onSubmit={this.onSubmit.bind(this)}>
  //
  //                             <label >Post Name</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="nameRef" placeholder="Post Name"/><br/>
  //
  //                             <label >Post Price</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="priceRef" placeholder="Enter Price"/><br/>
  //
  //                             <label >Post Description</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="descriptionRef" placeholder="Enter Description"/><br/>
  //
  //                             <label >Enter URL for post image</label>
  //                             <input className = 'form-control form-control-lg' type="text" ref="imageRef"  placeholder= "Upload Image"/><br/>
  //
  //                             <button className='btn btn-primary btn-lg'>Add Post </button>
  //                       </form>
  //                   </div>
  //
  //               </div>
  //       </div>
  //     );
  //   }
  //
  //
  //   }
