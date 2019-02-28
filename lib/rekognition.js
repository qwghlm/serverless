const request = require('request-promise').defaults({ encoding: null });
const Rekognition = require('node-rekognition');

const AWSParameters = {
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
  "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY,
  "region": process.env.AWS_REGION,
}
const rekognition = new Rekognition(AWSParameters)

// Fetchs an image URL and returns a Buffer with the data
async function fetchImageBuffer(url) {
  const imageBuffer = await request(url)
    .then((body) => new Buffer(body))
    .catch((error) => null);
  return imageBuffer;
}

// Given a Buffer with image data, get labels from AWS Rekognition
async function fetchLabels(imageBuffer) {
  const result = await rekognition.detectLabels(imageBuffer);
  return result.Labels.map(label => label.Name);
}

async function fetchLabelsFor(url) {
  const imageBuffer = await fetchImageBuffer(url);
  let labels = [];
  if (imageBuffer) {
    labels = await fetchLabels(imageBuffer);
  }
  return labels;
}

module.exports = { fetchLabelsFor };
