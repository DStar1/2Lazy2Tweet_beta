const Twit = require('twit'); //https://github.com/ttezel/twit
const fs = require('fs');
const config = require('./config/keys')

const args = process.argv.slice(2);

function sendTweet(args) {//status=args[0], text = "altText", mediaPath=null) {
    const token = args[0];
    const tokenSecret = args[1];
    const status = args[2];
    const mediaPath = args[3];
    const text = "altText";
    // console.log(status, mediaPath, text);

    // config.access_token = token;
    // config.access_token_secret = tokenSecret;
    const T = new Twit({
        consumer_key:         config.consumerToken,
        consumer_secret:      config.consumerTokenSecret,
        access_token:         token,
        access_token_secret:  tokenSecret,
        timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
      });

    
    // If no media
    // let mediaPath = null;//"./yo.jpg";
    // let status = "Hello Word!";
    // let text = "altText";


    if (!mediaPath || mediaPath == "") {
        T.post('statuses/update', { status: status }, function(err, data, response) {
        console.log(data);
        })
    } else {

        //
        // post a tweet with media
        //
        let b64content = fs.readFileSync(mediaPath, { encoding: 'base64' });

        // first we must post the media to Twitter
        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        let mediaIdStr = data.media_id_string;
        let altText = text;
        let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            let params = { status: status, media_ids: [mediaIdStr] }

            T.post('statuses/update', params, function (err, data, response) {
                console.log(data);
            });
            }
        });
        });
    }
}

sendTweet(args);

module.exports.sendTweet = sendTweet;