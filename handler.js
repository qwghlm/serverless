'use strict';

const { getMedia } = require("./lib/twitter.js");

module.exports.tweets = async (event, context) => {

  if (!event.queryStringParameters || !event.queryStringParameters.screen_name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "screen_name must be provided"
      })
    }
  }

  const { screen_name } = event.queryStringParameters;
  const result = await getMedia(screen_name);

  const statusCode = result.tweets ? 200 : 500;
  return {
    statusCode,
    body: JSON.stringify(result),
  };
};
