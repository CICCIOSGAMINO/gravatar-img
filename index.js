// Node.js - gravatar-img module
var crypto= require('crypto-js');

module.exports =  (function(){

    var baseHTTPS = 'https://www.gravatar.com/avatar/';
    var baseURL = 'www.gravatar.com/avatar/';

    var opts = {
      size: null,
      rating: null,
      defaultImg: null
    };

    function encryptMD5(plaintext){
        return crypto.MD5(plaintext).toString(crypto.enc.Hex);
    };

    // validate email function
    function validateEmail(email){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // clear the string passed (trim + )
    function prepareEmail(strtoclean){
        return strtoclean.trim().replace(/\s+/g, '').toLowerCase();
    };

    function buildParams(){
      var params = '';


        if (opts.size != null){
          params += '?s=' + opts.size;
        };

        if (opts.rating != null && opts.size != null){
          params += '&r=' + opts.rating;
        };

        if (opts.rating != null && opts.size == null){
          params += '?r=' + opts.rating;
        };

        if (opts.defaultImg != null && (opts.rating != null || opts.size != null)){
          params += '&d=' + opts.defaultImg;
        };

        if (opts.defaultImg != null && (opts.rating == null && opts.size == null)){
          params += '?d=' + opts.defaultImg;
        };

        return params;

    };


    return {

      setGravatarNull : function(){
        opts.size = null;
        opts.rating = null;
        opts.defaultImg = null;
      },

      setGravatarSize : function(pixel){
          if (!isNaN(pixel)){
            var pixel = parseInt(pixel);
            if (pixel < 1){
              pixel = 1;
            };
            if (pixel > 2048){
              pixel = 2048;
            };
            opts.size = pixel;
          }else {
            return new Error('Argument passed is not a number!');
          }

      },
      setGravatarRating : function(rate){
          if (typeof rate == 'string'){

            if (['g','pg','r','x'].indexOf(rate.toLowerCase()) >= 0){
              opts.rating = rate;
            }else{
              return new Error('Argument Rated passed is not valid value (p, pg, r, x)!');
            };

          }else {
            return new Error('Argument passed is not a string!');
          };

      },

      // URL should be URL encoded
      setGravatarDefaultImg : function(path){
        opts.defaultImg = path;
      },

      getGravatarOpts : function(){
        return opts;
      },

      getGravatarHTTPS : function(email, callback){
        // return a callback(err,link) with the HTTPS link
        if (validateEmail(prepareEmail(email))){
          callback(null,baseHTTPS + encryptMD5(prepareEmail(email)) + buildParams());
        }else{
          callback(new Error('Error - Not a valid Email!'), null);
        }
      },

      getGravatarURL : function(email, callback){

        // return a callback(err,link) with the URL (no protocol)
        if (validateEmail(prepareEmail(email))){
          callback(null,baseURL + encryptMD5(prepareEmail(email)) + buildParams());
        }else{
          callback(new Error('Error - Not a valid Email!'), null);
        }
      },

      getCleanedEmail : function(email, callback){
        // return a callback with a valid email or error callback(err, validemail)
        if (validateEmail(prepareEmail(email))){
          callback(null, prepareEmail(email));
        }else{
          callback(new Error('Error - Not a valid Email!'), null);
        };
      },

      getMD5Token(email){
          return encryptMD5(prepareEmail(email));
      }

    };

})();
