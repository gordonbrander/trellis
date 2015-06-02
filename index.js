const Hapi = require('hapi');

const lib = require('./lib.js');
const payloadToTrelloCard = lib.payloadToTrelloCard;
const isValidConfig = lib.isValidConfig;
const appendQuery = lib.appendQuery;

const request = require('request');

// Load config file.
const config = require('./trellis.json');
if (!isValidConfig(config)) throw Error('Must provide valid trellis.json');

const TRELLO_APP_KEY = config.app_key;
const TRELLO_TOKEN = config.token;
const LIST_ID = config.list_id;
const TRELLO_CARDS_API_ENDPOINT = 'https://api.trello.com/1/cards';

const server = new Hapi.Server();

function handlePosthook(req, reply) {
  // https://trello.com/docs/api/card/index.html#post-1-cards

  // Note that payload is parsed by Hapi.
  const payload = req.payload;

  if (!payload || !payload.action) {
    return reply({error: 'Invalid payload', payload: payload});
  }
  else if (payload.action !== 'opened') {
    // We're only interested in open actions.
    return reply({message: 'Ignored payload', payload: payload});
  }
  else {
    const postdata = payloadToTrelloCard(LIST_ID, payload);

    const trelloUrl = appendQuery(TRELLO_CARDS_API_ENDPOINT, {
      key: TRELLO_APP_KEY,
      token: TRELLO_TOKEN
    });

    // Kick off request.
    request({
      url: trelloUrl,
      method: 'POST',
      body: postdata,
      json: true
    }, function (error, response, body) {
      if (error) {
        return reply({error: 'Failed to post to Trello API'});
      } else {
        return reply({message: 'Successfully posted to Trello API'});
      }
    });
  }
}

// Don't hardcode port. Allow Heroku to determine port.
server.connection({port: (process.env.PORT || 5000)});

server.route({
  method: 'GET',
  path: '/status',
  handler: function (request, reply) {
    reply({message:'It works!'});
  }
});

server.route({
  method: "POST",
  path: "/posthook",
  handler: handlePosthook
});

server.start(function () {
  console.log('Server running at: ' + server.info.uri);
});