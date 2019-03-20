const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const twit = require("twit");
const config = require('./config');
const Twitter = new twit(config);
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/search', (req, res) => {
    console.log('recieve post request');
    let search_params = {q: req.body.post};
    search_twitter(search_params).then( (result)=>{
        console.log('Twitter api call done, sending response: ');
        res.send(extractTweetInfo(result));
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));


async function search_twitter(search_params) {
    let result = {error: null, response: null};
    try {
        result.response = await Twitter.get('search/tweets', search_params);
    } catch (error) {
        result.error = error;
        console.error(error);
    }

    return result
}


function extractTweetInfo(raw_data){
    let cleaned = {
        tweets: [],
        meta: {
            query: null,
            count: null,
            next_results: null
        }
    };

    for(let tweet of raw_data.response.data.statuses){
        cleaned.tweets.push(cleanTweet(tweet));
    }

    let meta = raw_data.response.data.search_metadata;
    cleaned.meta.query = meta.query;
    cleaned.meta.count = meta.count;
    cleaned.meta.next_results = meta.next_results;

    fs.writeFile("pretty_print_file.txt", JSON.stringify(raw_data, null, 2), (err)=>{
        if(err) console.log(err);
    });
    console.log(cleaned);
    return cleaned
}


function cleanTweet(tweet){
    let tweet_info = {
        created: null,
        id: null,
        text: null,
        hashtags: [],
        urls: [],
        user: {
            id: null,
            name: null
        },
        sentiment: {
            score: null,
            comparative: null
        }
    };
    tweet_info.created = tweet.created_at;
    tweet_info.id = tweet.id;
    tweet_info.text = tweet.text;
    tweet_info.hashtags= tweet.entities.hashtags.map(a => a.text);
    tweet_info.urls = tweet.entities.urls.map(a => a.url);

    let user_info = tweet.user;
    tweet_info.user.id = user_info.id;
    tweet_info.user.name = user_info.name;

    let tweet_sentiment = sentiment.analyze(tweet.text);
    tweet_info.sentiment.score = tweet_sentiment.score;
    tweet_info.sentiment.comparative = tweet_sentiment.comparative;

    console.log(JSON.stringify(tweet_info), null, 2);

    return tweet_info;
}