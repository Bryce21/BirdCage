import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main'
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme'
import {expect} from 'chai'
import TweetContainer from './TweetContainer'

configure({adapter: new Adapter()});
describe('all the tests',()=>{


    let tweets = null;
    let meta = null;
    beforeEach(()=>{
        tweets = [

                {
                    "created": "Wed Apr 03 00:35:12 +0000 2019",
                    "id": 1113238486839124000,
                    "text": "RT @NBCNews: India's recent anti-satellite test created 60 pieces of orbital debris big enough to track, 24 of which rise higher than the I…",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 267544664,
                        "name": "Rockland Bee"
                    },
                    "sentiment": {
                        "score": 2,
                        "comparative": 0.08333333333333333
                    }
                },
                {
                    "created": "Wed Apr 03 00:35:11 +0000 2019",
                    "id": 1113238482586021900,
                    "text": "RT @Astro_Christina: .@NASA makes history every time we pull together to make the challenging look easy.  Personally, we make history every…",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 825242630564958200,
                        "name": "Joe Johnson"
                    },
                    "sentiment": {
                        "score": 1,
                        "comparative": 0.045454545454545456
                    }
                },
                {
                    "created": "Wed Apr 03 00:35:07 +0000 2019",
                    "id": 1113238466060378100,
                    "text": "RT @NASA: This star cluster, Messier 11, is also known as the Wild Duck Cluster! 🦆 🦆 🦆\n   \nWhy? Look closely — the brightest stars in this…",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 825242630564958200,
                        "name": "Joe Johnson"
                    },
                    "sentiment": {
                        "score": 2,
                        "comparative": 0.06451612903225806
                    }
                },
                {
                    "created": "Wed Apr 03 00:35:04 +0000 2019",
                    "id": 1113238452445675500,
                    "text": "RT @Space_Station: We use a lot of acronyms at @NASA to keep a long story short. You'll hear them during our live mission commentary. But w…",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 825242630564958200,
                        "name": "Joe Johnson"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                },
                {
                    "created": "Wed Apr 03 00:35:04 +0000 2019",
                    "id": 1113238452269649900,
                    "text": "You got: \"NASA\"\nYou are super independent and self motivated! You love passion and romance but sometimes you need s… https://t.co/siFZAWEDc7",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/siFZAWEDc7"
                    ],
                    "user": {
                        "id": 2335818518,
                        "name": "ǝɟ"
                    },
                    "sentiment": {
                        "score": 11,
                        "comparative": 0.5238095238095238
                    }
                },
                {
                    "created": "Wed Apr 03 00:35:01 +0000 2019",
                    "id": 1113238437056745500,
                    "text": "RT @brooklynmarie: I’ve spent a lot of time in Calexico and Mexicali. That wall has been there for years. https://t.co/kK0Te1JFaJ",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/kK0Te1JFaJ"
                    ],
                    "user": {
                        "id": 824116562768621600,
                        "name": "AltNASA"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:59 +0000 2019",
                    "id": 1113238430933295100,
                    "text": "The impact of #Artificial #Intelligence will be evident in many sectors soon: A senior at UT Austin found two plane… https://t.co/P4QGRlMigr",
                    "hashtags": [
                        "Artificial",
                        "Intelligence"
                    ],
                    "urls": [
                        "https://t.co/P4QGRlMigr"
                    ],
                    "user": {
                        "id": 62759563,
                        "name": "Vilma Georgia Todri"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:58 +0000 2019",
                    "id": 1113238425358938100,
                    "text": "@AnuragN07931905 @majorgauravarya @NASA @isro What the hell all Indian scientists in @NASA  doing? Get back to home… https://t.co/RMdYGuNka8",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/RMdYGuNka8"
                    ],
                    "user": {
                        "id": 589007714,
                        "name": "Vishal"
                    },
                    "sentiment": {
                        "score": -4,
                        "comparative": -0.21052631578947367
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:56 +0000 2019",
                    "id": 1113238418975117300,
                    "text": "@AstroHague @Astro_Christina @NASA @Space_Station Way to go man, great to see an old friend achieve his dreams",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 175610023,
                        "name": "Jason Rucker"
                    },
                    "sentiment": {
                        "score": 5,
                        "comparative": 0.29411764705882354
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:55 +0000 2019",
                    "id": 1113238413694472200,
                    "text": "NASA’s chief has announced a new goal to land humans back on the moon within the next 5 years! #2019ES2232",
                    "hashtags": [
                        "2019ES2232"
                    ],
                    "urls": [],
                    "user": {
                        "id": 1086074364611637200,
                        "name": "Hayley King"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:52 +0000 2019",
                    "id": 1113238402353160200,
                    "text": "@AbhinavMishrAAP @narendramodi Great you discovered a statement from NASA to belittle our PM, you claim yourself to… https://t.co/4GqcK42yja",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/4GqcK42yja"
                    ],
                    "user": {
                        "id": 800292529283268600,
                        "name": "T v Gopinath"
                    },
                    "sentiment": {
                        "score": 1,
                        "comparative": 0.05555555555555555
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:43 +0000 2019",
                    "id": 1113238365426425900,
                    "text": "What the Failed All-Female Spacewalk Tells Us About Office Temperature - head of the Baldiwn School ...! https://t.co/6MEdRBUUCS",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/6MEdRBUUCS"
                    ],
                    "user": {
                        "id": 122564288,
                        "name": "soph"
                    },
                    "sentiment": {
                        "score": -2,
                        "comparative": -0.1111111111111111
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:41 +0000 2019",
                    "id": 1113238354781515800,
                    "text": "RT @AmplifyCapital: NASA chief says a Falcon Heavy rocket could fly humans to the Moon https://t.co/bCqrY1hBrI",
                    "hashtags": [],
                    "urls": [
                        "https://t.co/bCqrY1hBrI"
                    ],
                    "user": {
                        "id": 219997270,
                        "name": "Off Grid Media"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:40 +0000 2019",
                    "id": 1113238349572137000,
                    "text": "I’ve never seen them do a good thing for the world. #India #Pakistan \nhttps://t.co/2aN18cveLC",
                    "hashtags": [
                        "India",
                        "Pakistan"
                    ],
                    "urls": [
                        "https://t.co/2aN18cveLC"
                    ],
                    "user": {
                        "id": 310422136,
                        "name": "Faisal"
                    },
                    "sentiment": {
                        "score": 3,
                        "comparative": 0.2
                    }
                },
                {
                    "created": "Wed Apr 03 00:34:39 +0000 2019",
                    "id": 1113238347659354100,
                    "text": "The fact that my Lolo has literally worked on satellites with NASA will always blow my mind 👀😭",
                    "hashtags": [],
                    "urls": [],
                    "user": {
                        "id": 2989179764,
                        "name": "jerr 🔱"
                    },
                    "sentiment": {
                        "score": 0,
                        "comparative": 0
                    }
                }
            ];
        meta = {"query":"Nasa","count":15,"next_results":null,"nextResultsId":"?max_id=1113234257890041856&q=Nasa&lang=en&include_entities=1","currentResultsId":1113234337309319200}
    });


    it('renders main with dummy data included', (done) => {
        const wrapper = mount(<Main processing={'f'} tweets={tweets} meta={meta}/>);
        // Find an item by a constructor.
        expect(wrapper.find(TweetContainer)).to.have.lengthOf(1);
        // Find a component by an id
        expect(wrapper.find('#regexSearchBar')).to.have.lengthOf(1);
        done();
    });


    it('it filters correctly', (done) => {
        const wrapper = mount(<Main processing={'f'} tweets={tweets} meta={meta}/>);

        expect(wrapper.find(TweetContainer)).to.have.lengthOf(1);
        // Sets the regexValue (where the input from the regular value search bar is stored) to India. Replaces finding and inputting to regex bar
        wrapper.setState({ regexValue: 'India' });
        // Clicks the regex search bar button submit
        wrapper.find('#submitRegex').simulate('click');
        // Webstorm IDE giving warning about using equal (deprecated) but it is still used in documentation.
        expect(wrapper.state('filtered')).to.equal(true);
        expect(wrapper.state('filteredTweets').length).to.equal(3);
        done();
    });
});