gravatar-img
============
[TOC]

v2.0.0 - xx-01-2024

Simple Gravatar Node.js package, do you want more info? http://en.gravatar.com/

# Intro
Simple Node.js module for build https (Snowden teach us) URL for Gravatar pictures. Your Gravatar is an image that follows you from site to site appearing beside your name when you do things like comment or post on a blog. Avatars help identify your posts on blogs and web forums, so why not on any site? You need more info ? Check the official Gravatar [page][1].

# Version Details
Main changes by version (if the first number change, old code you have written is not supported, for
example between version 1.x.x to version 2.x.x (I apologize for that):

+ 1.1.0 First Version (hunting the bugs)
+ 1.1.3 minor text changes

+ 2.0.0 New version based on sha256 (no-dependencies / breaking changes)

# Development/Test

+ Node.js > 1.14
+ Mocha/Chai

To test the index.js main file, type on the root folder :

    $ npm test

or

    $ mocha

# Install
Like all the Node.js module can't be more easy :

```bash
  npm install gravatar-img

  # install and save in package.json
  npm install gravatar-img --save
```

## Usage
Install the package with npm, import with the **require** statement in the app, and start to use the apis. Yes of course you need to have the gravatar active on the gravatar(wordpress) environment, so take a look at the gravatar [link][2]. After that keep in mind

```javascript
  var g = require('gravatar-img');

  // set the size of the gravatar to get the link (min 1, MAX 2048) (optional)
  g.setGravatarSize(250);

  // set the rating for the gravatar to get link ('g', 'pg', 'r', x) (optional)
  // g: suitable for display on all websites with any audience type.
  // pg: may contain rude gestures,  swear words, or mild violence.
  // r: may contain such things as harsh profanity, violence, nudity, drug use.
  // x: may contain hardcore sexual imagery or extremely disturbing violence.
  g.setGravatarRating('g');

  // set the default image in case of miss the retrieve by email (URL) (optional)
  g.setGravatarDefaultImg('https://placehold.it/350x150');
```
If no options will be set, the default values are used :

+ size : 80x80
+ rating : 'g'
+ default-img : default gravatar miss image

```javascript

  // get the HTTPS link to gravatar img
  // eg. https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca
  // eg. https://www.gravatar.com/avatar/a5 ... ca?s=250&r=g&d=http://placehold.it/250x250
  g.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
    if (!err){
      // do stuff with the link
      console.log(link);
    }else {
      // handle the error (wrong email)
    }
  });

  // get the URL link to gravatar img
  // eg. www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca
  // eg. www.gravatar.com/avatar/a5c... 8fd5bca?s=250&r=g&d=http://placehold.it/250x250
  g.getGravatarURL('anyentertainment@gmail.com', function(err,link){
    if (!err){
      // do stuff with the link
      console.log(link);
    }else {
      // handle the error (wrong email)
    }
  });
```

## Other Methods
The module give you the access to other methods, most of them not commonly used :

```javascript
  // reset all the size, rating, default-img to the default value (80px, 'g', gravatar-img)
  g.setGravatarNull();

  // return a object with the properties size, rating, defaultImg
  g.getGravatarOpts();

  // return the email cleaned (trim() + inside space removed + toLowerCase + email REGEX check)
  // a possible email not valid error can be returned
  g.getCleanedEmail('anyentertainment@gmail.com', function(err,cleanedEmail){
    if(err){
      // handle the error
      else {
        // do stuff with the cleaned email
        console.log(cleanedEmail);
      }
    }
  });

  // get the MD5 hash cypher of the trim(emailPassed) - email won't be validate
  g.getMD5Token(email);

```


## Errors
Use the callback to check if an error is raised during the path building operations  :

```javascript
  g.getGravatarURL('anyentertainment@gmail.com', function(err,link){
    if (err){
      // handle the error
      console.log('Error', err);
    }
  });
```

### Test
The package is tested with mocha and chai. You can find the test file in the /test folder. If you need to use more tests on the
library, open an issue on the github repo (THANKS).



[1]:https://it.gravatar.com/site/implement/images/
[2]:http://en.gravatar.com/
