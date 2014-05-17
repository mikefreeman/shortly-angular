var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var linkSchema = mongoose.Schema({
 visits: {type: Number, default: 0},
 link: String,
 title: String,
 code: String,
 base_url: String,
 url: String,
 lastVisited: Date
});

var Link = mongoose.model('Link', linkSchema);

linkSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

module.exports = Link;
