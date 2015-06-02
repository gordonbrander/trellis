const url = require('url');
const http = require('http');
const querystring = require('querystring');

function isString(x) {
  return typeof x === "string";
}

function appendQuery(url, query) {
  return url + '?' + querystring.stringify(query);
}
exports.appendQuery = appendQuery;

function isValidConfig(config) {
  return (
    isString(config.list_id) &&
    isString(config.app_key) &&
    isString(config.token)
  );
}
exports.isValidConfig = isValidConfig;

// Create a description from payload
function payloadToDesc(payload) {
  const url = payload.issue.html_url;
  const body = payload.issue.body;
  return url + '\n\n' + body;
}

// Createa a title from payload
function payloadToTitle(payload) {
  return payload.issue.title + ' #' + payload.issue.number;
}

// Create a Trello card from payload.
// Documentation for Github `issue` webhook payloads:
// https://developer.github.com/v3/activity/events/types/
//
// Documentation for Trello card API
// https://trello.com/docs/api/card/index.html#post-1-cards.
function payloadToTrelloCard(listId, payload) {
  return {
    // The Trello list ID
    "idList": listId,
    "name": payloadToTitle(payload),
    "desc": payloadToDesc(payload),
    // @FIXME I'm not sure this is needed. Due is listed as required, but may
    // be null.
    "due": null,
    // Note: this activates some sort of automatic scraper that will find
    // description, images, etc and attach them to card.
    "urlSource": null
  };
}
exports.payloadToTrelloCard = payloadToTrelloCard;