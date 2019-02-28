const { getMedia } = require("./lib/twitter.js");
const { fetchLabelsFor } = require("./lib/rekognition.js");

async function tweets(event, context) {

  if (!event.queryStringParameters || !event.queryStringParameters.screen_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "screen_name must be provided"
      })
    }
  }

  const { screen_name } = event.queryStringParameters;
  let { tweets, error } = await getMedia(screen_name);

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }

  // Save killing the API!
  tweets = tweets.slice(0, 3);
  tweets = await Promise.all(tweets.map(async tweet => {
    const labels = await fetchLabelsFor(tweet.media_url_https)
    return {
      ...tweet,
      labels
    };
  }));

  return {
    statusCode: 200,
    body: JSON.stringify({ tweets }),
  };
};

module.exports = { tweets };
