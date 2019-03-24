import TweetContainer from './TweetContainer'
import React, {Component} from 'react';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            meta: {},
            processing: true,
            pagination: {
                currentPage: null,
                currentResultsId: null,
                nextResultsId: null
            },
            filteredTweets: [],
            filtered: false,

            apiSelectorValue: 'Standard',
            value: '',
            regexValue: '',
            count: '',
            createdOn: ''

        }
    }


    render() {
        let tweets = this.state.tweets;
        if (this.state.filtered) {
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
                <input type="text" name="value" onChange={this.handleChangeAbstract} placeholder="Nasa"/>

                <br/>
                <label>
                    API level:
                    <select value={this.state.apiSelectorValue} onChange={this.handleChangeAbstract}
                            name={'apiSelectorValue'}>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </label>

                <br/>
                <label>
                    Count:
                    <input type="number" name="count" onChange={this.handleChangeAbstract} style={{width: '20%'}}/>
                </label>

                <br/>
                <label>
                    Created since:
                    <input type="text" name="createdOn" onChange={this.handleChangeAbstract} placeholder="2011-07-11"
                           style={{width: '33%'}}/>
                </label>

                <br/>
                <input type="submit" value="Submit"/>

            </form>
        )
    }


    renderRegexSearchBar() {
        return (
            <div>
                <label>
                    <input type="text" name="regexValue" onChange={this.handleChangeAbstract}/>
                </label>
                <button onClick={this.handleRegexSubmit}>
                    Filter
                </button>
            </div>
        )
    }


    handleChangeAbstract = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


    handleRegexSubmit = e => {
        let regexValue = this.state.regexValue;
        if (regexValue === '') {
            this.setState({filteredTweets: [], filtered: false});
            return
        }
        let regex = null;
        let error = null;
        try {
            regex = new RegExp(regexValue, 'g');
        } catch (e) {
            error = e;
        }
        if (error != null) {
            return null
        }

        let filteredTweets = this.state.tweets.filter((tweet) => {
            return tweet.text.match(regex)
        });
        this.setState({filteredTweets: filteredTweets, filtered: true})

    };


    handleSubmit = async e => {
        e.preventDefault();
        console.log('Handle submit called');
        this.setState({processing: true});
        let body = JSON.stringify({
            value: this.state.value,
            apiSelectorValue: this.state.apiSelectorValue,
            count: this.state.count,
            createdOn: this.state.createdOn
        });

        await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((response) => {
            response.text().then((text) => {
                let data = JSON.parse(text);
                let currentPage = ((this.state.currentPage + 1) || 0);
                this.setState({
                    tweets: data.tweets,
                    meta: data.meta,
                    processing: false,
                    filteredTweets: [],
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