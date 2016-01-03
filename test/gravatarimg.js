// Node.js - tests of gravatarimg
var chai = require('chai');
var expect = require('chai').expect;
var gravatarimg = require('../index.js');

describe('Test on Gravatar-img Node.js module.', function(){

  // test the md5 hash function
  describe('md5 hashing', function(){
    it('Should return the MD5 hashing of this email anyentertainment@gmail.com: ', function(done){
      var myhash = gravatarimg.getMD5Token('anyentertainment@gmail.com');
      chai.assert.equal(myhash, 'a5ce16777a0e53b502649c1a08fd5bca');
      done();
    });
  });

  // test the clean functions well done
  describe('Prepare the email in trim() lowCase format ', function(done){
    it('Should trim() the front and back space from the email passed: ', function(done){
      gravatarimg.getCleanedEmail(' anyentertainment@gmail.com  ', function(err, cleanedEmail){
        chai.assert.equal(cleanedEmail, 'anyentertainment@gmail.com');
        done();
      });

    });

    it('Should trim() all the space (bound/inner) in the email passed: ', function(done){
      gravatarimg.getCleanedEmail(' anyent ertai nme nt@gma il.co m  ', function(err, cleanedEmail){
        chai.assert.equal(cleanedEmail, 'anyentertainment@gmail.com');
        done();
      });
    });

    it('Should lower case the email passed: ', function(done){
      gravatarimg.getCleanedEmail('aNYenTErTAiNmEnT@GMAIL.CoM', function(err, cleanedEmail){
        // chai.assert.equal(cleanedEmail, 'anyentertainment@gmail.com');
        expect(cleanedEmail).to.be.lowercase;
        done();
      });
    });
  });

  // test the MAX and min params value for setGravatarSize


  // test the Errors raised from wrong values passed
  describe('Error trigged when wrong values are passed to functions ', function(){
    it('Should raise and error when an invalid email is passed to getCleanEmail: ', function(done){
      gravatarimg.getCleanedEmail('thisis not a email', function(err,cleanedEmail){
        expect(err).to.be.an('error');
        expect(cleanedEmail).to.be.a('null');
        done();
      });
    });

    it('Should raise and error when an invalid email is passed to getGravatarHTTPS: ', function(done){
      gravatarimg.getGravatarHTTPS('thisis not a email', function(err,cleanedEmail){
        expect(err).to.be.an('error');
        expect(cleanedEmail).to.be.a('null');
        done();
      });
    });

    it('Should raise and error when an invalid email is passed to getGravatarURL: ', function(done){
      gravatarimg.getGravatarURL('thisis not a email', function(err,cleanedEmail){
        expect(err).to.be.an('error');
        expect(cleanedEmail).to.be.a('null');
        done();
      });
    });

    it('Should raise and error when an invalid size is passed to setGravatarSize: ', function(done){
      var response = gravatarimg.setGravatarSize('this is not a size ### ');
      expect(response).to.be.an('error');
      done();
    });

    it('Should raise and error when a type different from string is passed to setGravatarRating: ', function(done){
      var response = gravatarimg.setGravatarRating(null);
      expect(response).to.be.an('error');
      done();
    });

    it('Should raise and error when a value different from g, pg, r, x is passed to setGravatarRating: ', function(done){
      var response = gravatarimg.setGravatarRating('a');
      expect(response).to.be.an('error');
      done();
    });

  });

  describe('Check the right HTTPS and URL construction, size, rating and defaultURLimage', function(){
    it('Should built a right simple no params version of HTTPS gravatar URL: ', function(done){
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca');
        expect(err).to.be.a('null');
        done();
      });
    });
    it('Should built a right,simple no params version of gravatar URL: ', function(done){
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should built a HTTPS URL with only the size parameter, URL in valid form: ', function(done){
      // set the size
      gravatarimg.setGravatarSize(250);
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250');
        expect(err).to.be.a('null');
        done();
      });
    });
    it('Should built a URL with only the size parameter, URL in valid form: ', function(done){
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should built a  HTTPS URL with two parameter (size,ratings), URL in valid form: ', function(done){
      // set the rating
      gravatarimg.setGravatarRating('x');
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&r=x');
        expect(err).to.be.a('null');
        done();
      });
    });
    it('Should built a URL with two parameter (size,ratings), URL in valid form: ', function(done){
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&r=x');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should built a  HTTPS URL with three parameter (size,ratings,default), URL in valid form: ', function(done){
      // set the rating
      gravatarimg.setGravatarDefaultImg('http://placehold.it/250x250');
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&r=x&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });
    it('Should built a URL with three parameter (size,ratings,default), URL in valid form: ', function(done){
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&r=x&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });
  });

  describe('Test the function setGravatarNull to reset all the Gravatar options ', function(){
    it('Should set all the options at the null value: ', function(done){
      gravatarimg.setGravatarSize(250);
      gravatarimg.setGravatarRating('g');
      gravatarimg.setGravatarDefaultImg('http://placehold.it/350x150');
      gravatarimg.setGravatarNull();
      opts = gravatarimg.getGravatarOpts();
      expect(opts).to.deep.equal({
        size: null,
        rating: null,
        defaultImg: null
      });
      done();
    });
  });

  describe('Check the right HTTPS and URL construction, size, rating and defaultURLimage (2)', function(){
    it('Should build the right HTTPS URL with only rating setted ', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarRating('g');
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?r=g');
        expect(err).to.be.a('null');
        done();
      });
    });


    it('Should build the right HTTPS URL with only rating and default settings URL', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarRating('g');
      gravatarimg.setGravatarDefaultImg('http://placehold.it/250x250');
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?r=g&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should build the right HTTPS URL with only size and default settings URL', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarSize(250);
      gravatarimg.setGravatarDefaultImg('http://placehold.it/250x250');
      gravatarimg.getGravatarHTTPS('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('https://www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should build the right URL with only rating setted ', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarRating('g');
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?r=g');
        expect(err).to.be.a('null');
        done();
      });
    });


    it('Should build the right URL with only rating and default settings URL', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarRating('g');
      gravatarimg.setGravatarDefaultImg('http://placehold.it/250x250');
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?r=g&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });

    it('Should build the right URL with only size and default settings URL', function(done){
      gravatarimg.setGravatarNull();
      gravatarimg.setGravatarSize(250);
      gravatarimg.setGravatarDefaultImg('http://placehold.it/250x250');
      gravatarimg.getGravatarURL('anyentertainment@gmail.com', function(err,link){
        expect(link).to.be.equal('www.gravatar.com/avatar/a5ce16777a0e53b502649c1a08fd5bca?s=250&d=http://placehold.it/250x250');
        expect(err).to.be.a('null');
        done();
      });
    });




  });

});
