import React, {Component} from 'react';
import './register.css';
import Axios from 'axios';
// import { json } from 'sequelize/types';

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {name: '',  password:'', confirmPassword:''};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const {name, password, confirmPassword} = this.state;
        if(password !== confirmPassword){

        this.setState({message : 'Password does not match with repeat password field!<br/>'});
      }

      /*
      if (name === '' || name === null){
          this.setState({message : 'Name cannot be empty!<br/>'});
        } 
        if (password === '' || password === null){
          this.setState({message : 'Password cannot be empty!<br/>'});
        } 
        */

        Axios.post('/register',{name, password}).then((result)=>{
          // access results
          console.log(result);
      }).then(
        (response) =>{
          //console.log(response.data);
          
          // redirect signed in user to dashboard
          this.props.refreshPageAndGoToLogin();
        },
        (error)=>{
          console.log(error);
          document.location.reload(true);          
        });

    }

    render() {
      return (
        <div>
          <h1>Register</h1>
          <form class='register-form' onSubmit={this.handleSubmit}>
            
            <label>
            Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
            </label>
            <br/>

            <label>
            Password:
            <input id='pass1' type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
            </label>
            <br/>

            <label>
            Re-type password:
            <input id='pass2' type="password" value={this.state.confirmPassword} onChange={this.handleChange} name="confirmPassword" required/>
            </label>

            < input type="submit" value="Register" />

          </form>
          <div id="message">{this.state.message}</div>
        </div>
      );
    }
  }

  export default Register;