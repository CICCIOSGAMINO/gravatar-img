// Node.js - simple example

// import the module
var grav = require('./index.js');

// email
var email = 'marco.canali@gmail.com';

// set the size of the gravatar to get link (min 1px, MAX 2048)(optional)
grav.setGravatarSize(250);
// set the rating for the gravatar to get link
// g: suitable for display on all websites with any audience type.
// pg: may contain rude gestures, provocatively dressed individuals, the lesser swear words, or mild violence.
// r: may contain such things as harsh profanity, intense violence, nudity, or hard drug use.
// x: may contain hardcore sexual imagery or extremely disturbing violence.
grav.setGravatarRating('g');

// set the placeholder image when miss the retrieve by email
grav.setGravatarDefaultImg('http://placehold.it/250x250');

// retrive the gravatar https link for anyentertainment@gmail.com gravatar size 250px
grav.getGravatarHTTPS(email, function(err,link){
    if(!err){
      // do stuff with the link
      console.log(link);

    }else {
      // handle the error
      console.log('Error: ', err);
    }
});
