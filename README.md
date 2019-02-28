# Serverless Twitter image parser

A project to teach myself Serverless and using the AWS Rekognition API.

Creates a web endpoint that will:

  1. Fetch a Twitter user's latest Tweets
  2. Filter out any Tweets with images in them
  3. Run image recognition on each image
  4. Return a simple JSON object with Tweet text, image and labels

## Dev work

A `.env.development` file should be supplied with the following variables:

    # Twitter API
    TWITTER_CONSUMER_KEY=
    TWITTER_CONSUMER_SECRET=
    TWITTER_ACCESS_TOKEN_KEY=
    TWITTER_ACCESS_TOKEN_SECRET=

    # AWS Rekognition
    REKOGNITION_ACCESS_KEY_ID=
    REKOGNITION_SECRET_ACCESS_KEY=
    REKOGNITION_REGION=

To set up Twitter consumer keys & tokens, go to https://developer.twitter.com/en/apps

To set up a Rekognition account, set up an IAM user and role by following instructions here: https://docs.aws.amazon.com/rekognition/latest/dg/getting-started.html

Then, to run locally:

    $ serverless offline start

Then visit e.g. http://localhost:3000/tweets?screen_name=PAImages

## Deployment

To deploy, we use [AWS's Parameters Manager](https://eu-west-1.console.aws.amazon.com/systems-manager/parameters). To upload keys, run

    aws ssm put-parameter --type String --name TWITTER_CONSUMER_KEY --value <value>
    aws ssm put-parameter --type String --name TWITTER_CONSUMER_SECRET --value <value>
    aws ssm put-parameter --type String --name TWITTER_ACCESS_TOKEN_KEY --value <value>
    aws ssm put-parameter --type String --name TWITTER_ACCESS_TOKEN_SECRET --value <value>
    aws ssm put-parameter --type String --name REKOGNITION_ACCESS_KEY_ID --value <value>
    aws ssm put-parameter --type String --name REKOGNITION_SECRET_ACCESS_KEY --value <value>
    aws ssm put-parameter --type String --name REKOGNITION_REGION --value <value>
