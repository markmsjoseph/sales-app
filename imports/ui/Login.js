import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LoginHeader from './LoginHeader';


export default class Login extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        error:''
      };
    }

    componentWillMount() {
       if (Meteor.userId()){
         console.log("Has user but trying to go to authenticated page: In ComponentDidMount from Login.js");
             this.props.history.push('/home');
       }

   }


    onSubmitHandler(e){
        e.preventDefault();
        //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
        let email = this.refs.myEmail.value.trim();
        let password = this.refs.myPassword.value.trim();

        //takes 3 arguments, first is object with email or login,
        Meteor.loginWithPassword({email}, password, (err)=>{
          if(err){
            this.setState({error:err.reason});
          }
          else{
            this.setState({error:''});
          }

        });

    }
    onSubmitHandlerRegister(e){
        e.preventDefault();
        //all refs are stored on the this.refs object, trim is to take off all leading and after spaces
        let email = this.refs.myEmail.value.trim();
        let password = this.refs.myPassword.value.trim();
        let username = this.refs.userName.value.trim();


        //accounts.createUser takes 2 args, first is an obj, an email and password, second arg is a callback,
        //second arg gets called with an err arg, if there are any it is displayed
        Accounts.createUser({username, email, password}, (err)=>{
          if(err){
            this.setState({error:err.reason});
          }
          else{
            this.setState({error:''});
          }

        });

        // this.setState({
        //   error:"something went wrong"
        // });
    }
  // render() {
  //   return (<div>
  //     <h1>Login or Signup</h1>
  //     {this.state.error ? <p>{this.state.error}</p> : undefined }
  //     <form onSubmit={this.onSubmitHandler.bind(this)}>
  //         <input type="email" name="email" ref = "myEmail" placeholder = "email"/>
  //     <br></br>
  //         <input type="password" name="password" ref = "myPassword" placeholder= "password"/>
  //         <br></br>
  //         <button> Login</button>
  //     </form>
  //           <Link to ="/signup">Sign Up Here</Link>
  //         </div>
  // );
  // }

  render() {
    return (
      <div>

                <div className="vertical-center" >
                      <div className="wrapper wrapper__box wrapper__login-box">
                            <Tabs defaultIndex={1} onSelect={index => console.log(index)}>

                                   <TabList>
                                     <Tab>Login</Tab>
                                     <Tab>Register</Tab>
                                   </TabList>

                                   <TabPanel>
                                          {this.state.error ? <p>{this.state.error}</p> : undefined }
                                          <h3>Already have an account? You can login below</h3>
                                          <form onSubmit={this.onSubmitHandler.bind(this)}>
                                              <input className = 'form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "email"/>
                                              <br></br>
                                              <input className = 'form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "password"/>
                                              <br></br>
                                              <button className='btn btn-primary btn-lg'> Login</button>
                                          </form>
                                   </TabPanel>

                                   <TabPanel>
                                        <h3>Register with us below to login</h3>
                                         {this.state.error ? <p>{this.state.error}</p> : undefined }

                                         <form onSubmit={this.onSubmitHandlerRegister.bind(this)}>


                                                <input className = 'form-control form-control-lg' type="text" name="userName" ref = "userName" placeholder = "User Name"/>
                                                <br></br>

                                                <input className = 'form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "Email"/>
                                               <br></br>

                                               <input className = 'form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "Password"/>
                                               <br></br>

                                                <button className='btn btn-primary btn-lg'> Create Account</button>
                                         </form>

                                  </TabPanel>
                            </Tabs>
                </div>
                </div>
      </div>
  );
  }
}