// simple test - TODO delete
var grav = require('./index.js');

email = 'anyentertainment@gmail.com';

grav.setGravatarSize(250);
grav.setGravatarRating('x');
grav.setGravatarDefaultImg('http://placehold.it/250x250');


grav.getGravatarHTTPS(email, function(err,link){
    console.log('Error: ' + err + ' - Link: ' + link);
});
