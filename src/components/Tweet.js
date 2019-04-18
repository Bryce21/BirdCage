import React, { Component } from 'react';



export default class tweet extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: false,
            popUpView: false
        }
    }

    render(){
        return <div>
            {this.inBarRender()}
        </div>
    }

    inBarRender() {

        // let userUrl = "https://twitter.com/"+this.props.user.name;
        let userUrl = "https://twitter.com/intent/user?user_id="+this.props.user.id.toString();
        return <div>
            <ul style={{textAlign: 'center'}}>
                <li style={{style:'inline'}}>Tweet: {this.props.text}</li>
                <li style={{style:'inline'}}>User: <a href={userUrl} target="_blank">{this.props.user.name}</a></li>
                <li style={{style:'inline'}}>Created: {this.props.created}</li>
                <li style={{style:'inline'}}>Id: {this.props.id}</li>
                <li style={{style:'inline'}}>Hashtags: {this.props.hashtags}</li>
                <li style={{style:'inline'}}>Urls: <a href={this.props.urls} target="_blank">{this.props.urls}</a></li>
                <li style={{style:'inline'}}>Sentiment score: {this.props.score}</li>
                <li style={{style:'inline'}}>Sentiment comparative: {this.props.comparative}</li>
            </ul>
        </div>
    }
}


// User: text (image too?), Text: tool tip hover/popup, Hashtags: tooltip hover, urls: tooltip hover, sentiment score: text, sentiment comparative: comparative, selected: button, popupview: button
