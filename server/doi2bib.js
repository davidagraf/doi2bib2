'use strict';

var
request = require('request'),
Q = require('q'),
parseString = require('xml2js').parseString,

doi2bibOptions = function(doi) {
  return {
    url: 'https://doi.org/' + doi,
    headers: {
      'Accept': 'application/x-bibtex; charset=utf-8'
    }
  };
},
doi2bib = function(doi) {
  var deferred = Q.defer();
  request(doi2bibOptions(doi), function(error, response, body) {
    if (response.statusCode === 200) {
      deferred.resolve(body);
    } else {
      deferred.reject(response.statusCode);
    }
  });
  return deferred.promise;
},
pmid2doiOptions = function(pimd) {
  var options = {
    url: 'http://www.pubmedcentral.nih.gov/utils/idconv/v1.0/?format=json&ids=' + pimd,
    json: true
  };
  return options;
},
pmid2doi = function(pmid) {
  var deferred = Q.defer();
  request(pmid2doiOptions(pmid), function(error, response, body) {
    if (response.statusCode !== 200) {
      deferred.reject(response.statusCode);
    } else if (!body.records || !body.records[0]) {
      deferred.reject(204); // not found
    } else {
      deferred.resolve(body.records[0].doi);
    }
  });
  return deferred.promise;
},
arxivid2doiOptions = function(arxivid) {
  var options = {
    url: 'http://export.arxiv.org/api/query?id_list=' + arxivid
  };
  return options;
},
arxivid2doi = function(arxivid) {
  var deferred = Q.defer();
  request(arxivid2doiOptions(arxivid), function(error, response, body) {
    if (response.statusCode !== 200) {
      deferred.reject(response.statusCode);
    } else if (!body) {
      deferred.reject(204);
    } else {
      parseString(body, function(err, result) {
        if (err || !result.feed.entry[0]['arxiv:doi']) {
          deferred.reject(404);
        } else {
          var doi = result.feed.entry[0]['arxiv:doi'][0]._;
          deferred.resolve(doi);
        }});
      }});
  return deferred.promise;
};


module.exports = {
  doi2bib: doi2bib,
  pmid2doi: pmid2doi,
  arxivid2doi: arxivid2doi
};
