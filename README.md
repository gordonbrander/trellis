A hacked together web service that creates a Trello card whenever a new Github issue is created.

App Configuration
-----------------

Create a `trellis.json` in the same directory as `index.js`, with the following
fields:

    {
      "app_key": "...",
      "token": "...",
      "list_id": "..."
    }

Unless all of the boards are public, you will need to provide both an
application key and a token authorizing you to see the boards in the
organization.

Get the app API key:

https://trello.com/docs/gettingstarted/index.html#getting-an-application-key

1. Log in to Trello
2. Go to https://trello.com/app-key

Get a read/write token that never expires:

https://trello.com/docs/gettingstarted/index.html#token

1. Log in to Trello
2. Open this in your browser `https://trello.com/1/authorize?key=<APP_KEY>&name=Trellis&expiration=never&response_type=token&scope=read,write`, where `<APP_KEY>` is the application key created above.

Get the list ID:

1. Log into Trello
2. Open your board in the browser. Note down the `BOARD_ID` in the URL: `https://trello.com/b/<BOARD_ID>/my-board-name`
3. Load `https://api.trello.com/1/board/<BOARD_ID>/lists?key=<KEY>&token=<TOKEN>`, replacing `<BOARD_ID>`, `<KEY>` and `<TOKEN>` with the values from above. You'll see a JSON blob containing all of your lists. Identify the correct list and copy the list ID.


Setting up with Github Webhooks
-------------------------------

1. Go to the webhook settings page for your repository and create a new hook (`https://github.com/gordonbrander/trellis/settings/hooks/new`).
2. In the `Payload URL` field, type `http://<MY_DOMAIN>/posthook`, where `<MY_DOMAIN>` is the domain at which Trellis is hosted.
3. Under `Which events would you like to trigger this webhook?`, select `Issues`.

Webhook docs: https://developer.github.com/webhooks/


Deploying on Heroku
-------------------

- Make sure to add a `trellis.json` file (see above)!
- Check out https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction
- Download the Heroku Toolbelt https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
- Deploy https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app


Checklist
---------

- [x] Create cards when issues are created
- [ ] Archive cards when issues are closed (or move to "closed" list if closed by PR?)
- [ ] Un-archive cards and add to list when issues are re-opened
- [ ] Add DB to map card IDs to issue IDs, allowing us to update Trello Cards when issue is updated.