import React, {Component} from 'react';
import './content.css';
import axios from 'axios';
import Auth from './Auth'

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // lists : [],
             items : [],
            };
        this.callDibs = this.callDibs.bind(this);
    }

    callDibs(event) {
        
    }

    componentWillMount() {
        axios.get('/items',{headers: {
            Authorization: "Bearer " + Auth.getToken()
         }}).then((response) => {
            console.log(response.data);
            this.setState({
                items: response.data
            })
            //.catch(err => console.log("Error when fetching items from database: " + err))
        });
    }

    render() {
        let items = this.state.items.map((item) => {
            return (
                <tr>
                    <td>{item.item_id}</td>
                    <td><button value="Call dibs" onClick={this.callDibs} /></td>
                </tr>
            )
        });
        return (<tbody>{items}</tbody>);
    }        
}

export default Content;