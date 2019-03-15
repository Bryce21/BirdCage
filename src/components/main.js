import TweetContainer from './TweetContainer'
import React, { Component } from 'react';


export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: [],
            meta: {},
            processing: false,
            value: ''
        }
    }


    render(){
        if(!this.state.processing){
            return (
                <div>
                    {this.render_searchbar()}
                    <br/>
                    <TweetContainer tweets={this.state.tweets} meta={this.state.meta}/>
                </div>
            )
        }
        return <div>
            {this.render_searchbar()}
        </div>

    }


    render_searchbar(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }


    handleChange = (event) => {
        console.log('Handle change called');
        this.setState({value: event.target.value});
    };


    handleSubmit = async e => {
        console.log('Handle submit called');
        this.setState({processing: true});
        e.preventDefault();
        await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.value }),
        }).then((response)=>{
            response.text().then((text)=>{
                let data = JSON.parse(text);
                this.setState({tweets: data.tweets, meta: data.meta, processing: false});
            });

        });

    };
}