import Tweet from './Tweet';
import ListGroup from 'react-bootstrap/ListGroup'
import React, { Component } from 'react';


export default class TweetContainer extends Component {
    render(){

        let items = [];
        let number = 0;
        for(let tweet of this.props.tweets){
            items.push(
                <ListGroup.Item key={number}>
                    <Tweet text={tweet.text} id={tweet.id} hashtags={tweet.hashtags} urls={tweet.urls} created={tweet.created} user={tweet.user} score={tweet.sentiment.score} comparative={tweet.sentiment.comparative}/>
                </ListGroup.Item>

            );
            number++;
        }

        const paginationBasic = (
            <div>
                <ListGroup>
                    {items}
                </ListGroup>
            </div>
        );
        return (
            <div>
                {paginationBasic}
            </div>

        )
    }

    // This will be what causes re render on props change
    componentWillReceiveProps(nextProps, nextContext) {

    }
}
