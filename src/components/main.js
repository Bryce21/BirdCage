import TweetContainer from './TweetContainer'
import React, {Component} from 'react';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            meta: {},
            processing: true,
            value: '',
            regexValue: '',
            pagination: {
                currentPage: null,
                currentResultsId: null,
                nextResultsId: null
            },
            filteredTweets: [],
            filtered: false
        }
    }


    render() {
        let tweets = this.state.tweets;
        if(this.state.filtered){
            tweets = this.state.filteredTweets
        }
        if (!this.state.processing) {
            return (
                <div>
                    {this.renderSearchbar()}
                    <br/>
                    {this.renderRegexSearchBar()}
                    <TweetContainer tweets={tweets} meta={this.state.meta}/>
                </div>
            )
        }
        return <div>
            {this.renderSearchbar()}
        </div>

    }


    renderSearchbar() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }


    renderRegexSearchBar() {
        return (
            <div>
                <label>
                    <input type="text" name="name" onChange={this.handleRegexChange}/>
                </label>
                <button onClick={this.handleRegexSubmit}>
                    Filter
                </button>
            </div>
        )
    }


    handleRegexChange = (event) => {
        this.setState({regexValue: event.target.value});
    };


    handleChange = (event) => {
        console.log('Handle change called');
        this.setState({value: event.target.value});
    };


    handleRegexSubmit = e => {
        let regexValue = this.state.regexValue;
        if(regexValue === ''){
            this.setState({filteredTweets: [], filtered: false});
            return
        }
        let regex = null;
        let error = null;
        try {
            regex = new RegExp(regexValue, 'g');
        } catch(e) {
            error = e;
        }
        if (error != null){return null}

        let filteredTweets = this.state.tweets.filter( (tweet) => {
            return tweet.text.match(regex)
        });
        this.setState({filteredTweets: filteredTweets, filtered: true})

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
            body: JSON.stringify({post: this.state.value}),
        }).then((response) => {
            response.text().then((text) => {
                let data = JSON.parse(text);
                let currentPage = ((this.state.currentPage + 1) || 0);
                this.setState({
                    tweets: data.tweets, meta: data.meta, processing: false, filteredTweets: [],
                    filtered: false,
                    pagination: {
                        currentPage: currentPage,
                        currentResultsId: data.meta.currentResultsId,
                        nextResultsId: data.meta.nextResultsId

                    }
                });
            });

        });

    };
}