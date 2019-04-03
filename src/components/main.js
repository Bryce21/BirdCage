import TweetContainer from './TweetContainer'
import React, {Component} from 'react';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: this.props.tweets || [],
            meta: this.props.meta || {},
            processing: this.props.processing || 't',
            pagination: {
                currentPage: null,
                currentResultsId: null,
                nextResultsId: null
            },
            filteredTweets: this.props.filteredTweets || [],
            filtered: this.props.filtered || false,

            apiSelectorValue: 'Standard',
            value: '',
            regexValue: '',
            count: '',
            sortBySentiment: false
        }
    }


    render() {
        let tweets = this.state.tweets;
        if (this.state.filtered) {
            tweets = this.state.filteredTweets
        }
        if (this.state.processing === 'f') {
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
                <input type="text" name="value" onChange={this.handleChangeAbstract} placeholder="Nasa" id={'searchBar'}/>

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
                <input type="submit" value="Submit" id={'submitButton'}/>

            </form>
        )
    }


    renderRegexSearchBar() {
        return (
            <div>
                <label>
                    <input type="text" name="regexValue" onChange={this.handleChangeAbstract} id={'regexSearchBar'}/>
                </label>
                <br/>

                <label>
                    Sort by Sentiment score:
                    <input
                        name="sortBySentiment"
                        type="checkbox"
                        checked={this.state.sortBySentiment}
                        onChange={this.handleCheckboxChange} />
                </label>
                <br/>

                <button onClick={this.handleRegexSubmit} id={'submitRegex'}>
                    Filter
                </button>
            </div>
        )
    }


    handleChangeAbstract = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


    handleCheckboxChange = (event) =>{
        let newSortBySentiment = true;
        if(this.state.sortBySentiment){
            newSortBySentiment = false;
        }
        this.setState({sortBySentiment: newSortBySentiment})
    };


    handleRegexSubmit = e => {
        let filteredTweets = this.state.tweets;
        filteredTweets = this.filterByRegularExpression();
        if(this.state.sortBySentiment){
            filteredTweets = this.filterBySentimentValue(filteredTweets);
        }
        this.setState({filteredTweets: filteredTweets, filtered: true})
    };


    filterByRegularExpression(){
        let regexValue = this.state.regexValue;
        if (regexValue === '') {
            this.setState({filteredTweets: [], filtered: false});
            return this.state.tweets
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
        let tweetsToFilter = this.state.filteredTweets;
        if(!this.state.filtered){
            tweetsToFilter = this.state.tweets;
        }
        let filteredTweets = tweetsToFilter.filter((tweet) => {
            return tweet.text.match(regex)
        });
        return filteredTweets
    }


    filterBySentimentValue(tweetsToFilter){
        return tweetsToFilter.sort((a,b) => {
            return a.sentiment.score - b.sentiment.score
        });
    }


    handleSubmit = async e => {
        e.preventDefault();
        console.log('Handle submit called');
        this.setState({processing: 't'});
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
                    processing: 'f',
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