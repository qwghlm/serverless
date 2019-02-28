'use strict';

const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function parseTweet(tweet) {
  if (tweet.retweeted_status) {
    return parseTweet(tweet.retweeted_status);
  }
  const { full_text, entities: { media } } = tweet;

  if (!media || media.length === 0) {
    return null;
  }

  const { media_url_https } = media[0];

  return { full_text, media_url_https };
}

module.exports.tweets = async (event, context) => {

  console.log(event.queryStringParameters)

  if (!event.queryStringParameters || !event.queryStringParameters.screen_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "screen_name must be provided"
      })
    }
  }

  const { screen_name } = event.queryStringParameters;
  const params = { screen_name, tweet_mode: "extended" };
  const result = await client.get('statuses/user_timeline', params)
    .then((tweets, request) => {
      return {
        tweets: tweets.map(parseTweet).filter(item => item !== null)
      }
    })
    .catch((error) => {
      return { error }
    })

  const statusCode = result.tweets ? 200 : 500;
  return {
    statusCode,
    body: JSON.stringify(result),
  };
};
