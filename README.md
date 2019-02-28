# Serverless Twitter image parser

A project to teach myself Serverless and using the AWS Rekognition API.

Creates a web endpoint that will:

  1. Fetch a Twitter user's latest Tweets
  2. Filter out any Tweets with images in them
  3. Run image recognition on each image
  4. Return a simple JSON object with Tweet text, image and labels

## Dev work

A `.env` file should be supplied with the following variables:

    # Twitter API
    TWITTER_CONSUMER_KEY=
    TWITTER_CONSUMER_SECRET=
    TWITTER_ACCESS_TOKEN_KEY=
    TWITTER_ACCESS_TOKEN_SECRET=

    # AWS Rekognition
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=

To set up Twitter consumer keys & tokens, go to https://developer.twitter.com/en/apps

To set up a Rekognition account, set up an IAM user and role by following instructions here: https://docs.aws.amazon.com/rekognition/latest/dg/getting-started.html

Then, to run locally:

    $ serverless offline start

Then visit e.g. http://localhost:3000/tweets?screen_name=PAImages

## Deployment

Not done yet!
