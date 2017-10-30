'use strict';

const
  request = require('request'),
  parseString = require('xml2js').parseString;

function doi2bibOptions(doi) {
  return {
    url: 'https://doi.org/' + doi,
    headers: {
      'Accept': 'application/x-bibtex; charset=utf-8'
    }
  };
}

function doi2bib(doi) {
  return new Promise((resolve, reject) => {
    request(doi2bibOptions(doi), function(error, response, body) {
      if (response.statusCode === 200) {
        resolve(body);
      } else {
        reject(response.statusCode);
      }
    });
  });
}

function pmid2doiOptions(pimd) {
  var options = {
    url: 'http://www.pubmedcentral.nih.gov/utils/idconv/v1.0/?format=json&ids=' + pimd,
    json: true
  };
  return options;
}

function pmid2doi(pmid) {
  return new Promise((resolve, reject) => {
    request(pmid2doiOptions(pmid), function(error, response, body) {
      if (response.statusCode !== 200) {
        reject(response.statusCode);
      } else if (!body.records || !body.records[0]) {
        reject(204); // not found
      } else {
        resolve(body.records[0].doi);
      }
    });
  });
}

function arxivid2doiOptions(arxivid) {
  var options = {
    url: 'http://export.arxiv.org/api/query?id_list=' + arxivid
  };
  return options;
}

function arxivid2doi(arxivid) {
  return new Promise((resolve, reject) => {
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
          }
        });
      }});
    });
}


module.exports = {
  doi2bib: doi2bib,
  pmid2doi: pmid2doi,
  arxivid2doi: arxivid2doi
};
