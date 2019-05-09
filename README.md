# 2Lazy2Tweet_beta

## Description:
An app that will schedule and post to Twitter for you, so your fans are happy to recieve consistent nonsense about your life with way lass stress for you! 😆 
This app utilizes:

## Why:
I wanted to learn how to build a full fledged web app that has secure login and authentication as well as utilizes a database using Node.js and Express.js. It took me about a week to learn Node.js and Express. I really enjoyed the proccess of learning these technologies. I hope that some people will use this app, cause I don't use Twitter very much. lol

### Tools:
All technologies used this project were chosen because I had never used them before. Took some online classes to learn quicker (1 week).
```
node.js
express.js
MongoDB
Passport.js
Ejs layouts
bcrypt.js
OAuth
cors
node-cron
```

### Setup:
Add a keys.js to the config file with your credentials
```
module.exports = {
    MongoURI: <MONGODB URI>,
    consumerToken: <YOUR CONSUMER TOKEN>,
    consumerTokenSecret: <YOUR CONSUMER TOKEN SECRET>
}
```

### Run:
Then to run app:
```
$> npm i
$> npm run start
```
