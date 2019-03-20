import React, { Component } from 'react';



export default class tweet extends Component {


    render(){
        return (
            <div>
                <ul style={{textAlign: 'center'}}>
                    <li style={{style:'inline'}}>Tweet: {this.props.text}</li>
                    <li style={{style:'inline'}}>Id: {this.props.id}</li>
                    <li style={{style:'inline'}}>Hashtags: {this.props.hashtags}</li>
                    <li style={{style:'inline'}}>Urls: {this.props.urls}</li>
                    <li style={{style:'inline'}}>Sentiment score: {this.props.score}</li>
                    <li style={{style:'inline'}}>Sentiment comparative: {this.props.comparative}</li>
                </ul>
            </div>
        )
    }
}