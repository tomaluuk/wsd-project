import React, {Component} from 'react';
import './login.css';
import Auth from './Auth'
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {name: '',password:''};
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const {name, password} = this.state;
      //send a post request

      Axios.post('/login', { name, password }).then((response) => {
      // access response
      console.log('Result:', response);
      // save the token
      Auth.authenticateUser(response.data.token);
      console.log('token:', Auth.getToken());
      this.setState({ name: '', password: '' });

      this.props.refreshPage();
    },
      (error) => {
        console.log(error);
      });
  }

    render() {
      return (
        <div>
          <h1>Log in</h1>
          <form class='login-form' onSubmit={this.handleSubmit}>
            <label>
            Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} name="name" required/>
            </label>
            <br/>
            <label>
          Password:
            <input type="password" value={this.state.password} onChange={this.handleChange} name="password" required/>
            </label>
            <br/>
          < input type="submit" value="Log in" />
          </form>
        </div>
      );
    }
  }

  export default Login;