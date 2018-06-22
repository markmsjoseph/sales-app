import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import LoginHeader from './LoginHeader';
import { CSSTransitionGroup } from 'react-transition-group';
// import {Session} from 'meteor/session';
// IN ORDER TO VERIFY EMAILS ETC, WE NEED AN SMTP ACCOUNT. THIS STEP WAS SKIPPED but
// THIS URL HAS DATA ON IT https://themeteorchef.com/tutorials/sign-up-with-email-verification AND
//https://docs.meteor.com/api/passwords.html#Accounts-verifyEmail

export default class Login extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        error:''
      };
    }

    componentWillMount() {
        // Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
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
            this.setState({error:"Login Failed. Check Email and Password"});
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



        if(password.length < 6){
          return this.setState({error: 'Password must be more than 6 characters long'})
        }
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


    }

  render() {
    return (
      <div>
<Link to ="/" className = "logoutButton">Back to Home</Link>
<div className="container">

      <div className="row justify-content-center">
    <CSSTransitionGroup transitionName="loginLoad" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={300} transitionLeaveTimeout={ 300}>
      <div className="boxed-view">
            <div className="boxed-view__box">

                      <Tabs defaultIndex={1} onSelect={index => console.log(index)}>

                             <TabList className="tabtop">


                               <h1 className = "chatAppHeader">Sales App </h1>

                              <CSSTransitionGroup transitionName="tabLoad" transitionAppear={true} transitionAppearTimeout={800}  transitionLeave={false} >
                                     <Tab>Sign In</Tab>
                                     <Tab>Sign Up</Tab>
                             </CSSTransitionGroup>
                             </TabList>

                                   <TabPanel>
                                     <CSSTransitionGroup transitionName="switchTabs" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={800} transitionLeaveTimeout={ 800}>
                                        <h4 className="login-error">  {this.state.error ? <p>{this.state.error}</p> : undefined }</h4>
                                          <h3 className = "formHeader">Already have an account? You can login below</h3>
                                          <form onSubmit={this.onSubmitHandler.bind(this)} noValidate>
                                              <div className="row justify-content-center">
                                                  <i className="glyphicon glyphicon-user "></i>
                                              <input  id="myInput" className = ' inputLoginFormStyles form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "email"/>
                                            </div>
                                              <br></br>
                                                <div className="row justify-content-center">
                                                    <i className="glyphicon glyphicon-lock "></i>
                                                  <input id="myInput" className = ' inputLoginFormStyles form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "password"/>
                                                </div><br></br>
                                              <button className='button-login'> Login</button>
                                          </form>
                                        </CSSTransitionGroup>
                                   </TabPanel>


                             <TabPanel>
                               <CSSTransitionGroup transitionName="switchTabs" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={800} transitionLeaveTimeout={ 800}>
                                  <h3 className = "formHeader">Register to sell/chat with users</h3>
                                  <p className="demoAppWords">(Its a demo app so you can use a made up email)</p>
                                    <p className="login-error">  {this.state.error ? <p>{this.state.error}</p> : undefined }</p>

                                   <form onSubmit={this.onSubmitHandlerRegister.bind(this)} noValidate>


                                            <div className=" row justify-content-center">

                                              <i className="glyphicon glyphicon-user "></i>
                                              <input id="myInput" className = 'inputLoginFormStyles form-control form-control-lg' type="text" name="userName" ref = "userName" placeholder = "User Name"/>

                                            </div><br></br>

                                            <div className="  row justify-content-center">
                                                <i className="glyphicon glyphicon-envelope "></i>
                                              <input id="myInput" className = 'inputLoginFormStyles form-control form-control-lg' type="email" name="email" ref = "myEmail" placeholder = "Email"/>

                                         </div>
                                           <br></br>

                                           <div className=" row justify-content-center">
                                                <i className="glyphicon glyphicon-lock "></i>
                                             <input id="myInput" className = 'inputLoginFormStyles form-control form-control-lg' type="password" name="password" ref = "myPassword" placeholder= "Password"/>

                                         </div>
                                           <br></br>

                                          <button className=' button-login'> Create Account</button>
                                   </form>
                                                   </CSSTransitionGroup>

                            </TabPanel>
                      </Tabs>

          </div>
          </div>
             </CSSTransitionGroup>
              </div>
</div>
      </div>
  );
  }
}
