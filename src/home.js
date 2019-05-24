import React, { Component } from 'react';
import axios from 'axios';
import Content from './content';
import Login from './login';
import Register from './register';
import Auth from './Auth';

class Home extends Component {
    constructor(props) {
        super(props);
        this.refreshPage = this.refreshPage.bind(this);
        this.state = { show: false, new_item: '', user: '' };
        this.refreshPageAndGoToLogin = this.refreshPageAndGoToLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    toggle() {
        this.setState({
            shown: !this.state.shown
        });
    }

    refreshPage(){
        this.forceUpdate();
    }
    
    refreshPageAndGoToLogin(){
        this.refreshPage();
        this.toggle();
    }

    logout(){
        alert('logout');

        // Add this token to blacklist 
        axios.post('/logout',{},{token:Auth.getToken()}).then((result)=>{
            // access results
            console.log(result);
        })

        // Delete token from browser
        Auth.deauthenticateUser();

        this.refreshPage();
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    /*
    getId() {
        axios.get('/currentUser') {headers: {
            Authorization: "Bearer " + Auth.getToken()
         }}).then((response) => {
            return response;
            //console.log("Current user id: ", response.data);
            //this.forceUpdate();
            //return Auth.getUserId();
        });
    }
    */

    handleSubmit(event) {
        event.preventDefault();
        console.log('auth.getuserid: ' + Auth.getUserId());
        this.setState({user : Auth.getUserId()}); 
        const {new_item, user} = this.state;
        console.log(new_item, user);
        if (new_item === ''){
            this.setState({message : '\'New item\' cannot be empty!<br/>'});
        }

        axios.post('/addItem',{new_item, user}).then((response) => {
            console.log("Result: ", response.data);
            document.location.reload(true); 
        },
        (error)=>{
            console.log(error);
            document.location.reload(true);  
        });
    }



    componentDidMount(){
        console.log('Mount homepage')
        axios.post('/test',{},{headers: {
            Authorization: "Bearer " + Auth.getToken()
         }}).then((response) => {
            console.log(response.data);
        });
    }

    render() {
        var shown = {
            display: this.state.shown ? "none" : "block"
        };

        var hidden = {
            display: this.state.shown ? "block" : "none"
        };

        return (
            <div>
                {Auth.isUserAuthenticated() ? (
                    <div>
                        <div id="logout">
                            <button onClick={this.logout.bind(this)}>LogOut</button>
                        </div>
                        <div>
                            <h1>Items in list:</h1>
                            <form onSubmit={this.handleSubmit}>

                                <label>
                                    Add item:
                                <input type="text" value={this.state.new_item} onChange={this.handleChange} name="new_item"></input>
                                </label>
                                <input type='submit' value='Add item'></input>
                            </form>
                            <Content />
                        </div>
                    </div>
                ) : (
                    <div id="login">

                        <div style={shown}>
                            <Login refreshPage={this.refreshPage} /><br />
                            <button onClick={this.toggle.bind(this)}>Register</button>
                        </div>

                        <div style={hidden}>
                            <Register refreshPageAndGoToLogin={this.refreshPageAndGoToLogin} /><br />
                            <p>Already have an account?  </p>
                            <button onClick={this.toggle.bind(this)}>Log in</button>
                        </div>

                    </div>
                    )}
            </div>
        );
    }
}

export default Home;