import Bibparser from './bibparser.jison';

const SPECIAL_CHARS = {
  'à': '\\`a',
  'ô': '\\^o',
  'ê': '\\^e',
  'â': '\\^a',
  '®': '{\\textregistered}',
  'ç': '\\c{c}',
  'ö': '\\"{o}',
  'ä': '\\"{a}',
  'ü': '\\"{u}',
  'Ö': '\\"{O}',
  'Ä': '\\"{A}',
  'Ü': '\\"{U}'
};

/**
 * Sometimes, the greek chars aren't properlty formatted in the received bib.
 * e.g. the bib for 10.1002/cncr.29046 contains {\varEpsilon} instead of {$\varEpsilon$}.
 * There, we inject the missing $ chars into the title string.
 */
function insertDollars(str) {
  return str.replace(/(\{)(\\var[A-Z]?[a-z]*)(\})/, '$1$$$2$$$3');
}

function encodeSpecialChars(str) {
  return str.replace(
    new RegExp(Object.keys(SPECIAL_CHARS).join('|'),'gi'),
    function(matched){
      return SPECIAL_CHARS[matched];
    }
  );
};

export default class Bib {
  constructor(bibStr) {
    this.bib = Bibparser.parse(bibStr);

    if (this.bib.tags.pages === 'n/a-n/a') {
      delete this.bib.tags.pages;
    }
    if (this.bib.tags.pages && this.bib.tags.pages.indexOf('--') === -1) {
      this.bib.tags.pages = this.bib.tags.pages.replace(/-/g, '--');
    }

    /* id specific */
    if (this.bib.id) {
      this.bib.id = this.bib.id.replace(/_/g, '');
    }

    // bib url contains url encoding -> we decode those characters here
    if (this.bib.tags.url) {
      this.bib.tags.url = decodeURIComponent(this.bib.tags.url);
    }


    if (this.bib.tags.title) {
      if (Array.isArray(this.bib.tags.title)) {
        this.bib.tags.title = this.bib.tags.title.map(t => insertDollars(t))
      } else {
        this.bib.tags.title = insertDollars(this.bib.tags.title);
      }
    }

    // remove brackets from month
    console.log(bibStr);
    console.log(this.bib.tags.month);
  }

  toPrettyString() {
    var result;

    result = '@' + this.bib.type + '{' + this.bib.id;

    Object.keys(this.bib.tags).forEach(key => {
      const useBrackets = !['month'].includes(key);
      const value = this.bib.tags[key];
      result += ',\n  ' + key + ' = ';
      if (useBrackets) {
        result += '{';
      }
      result += encodeSpecialChars(value.join ? value.join(', ') : value);
      if (useBrackets) {
        result += '}';
      }
    });

    result += '\n}';

    return result;
  };

  getURL() {
    return this.bib.tags.url;
  }
}
