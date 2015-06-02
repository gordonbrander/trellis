A hacked together web service that creates a Trello card whenever a new Github issue is created.

Configuration
-------------

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

Setting up Github Webhooks
--------------------------

https://developer.github.com/webhooks/
https://developer.github.com/v3/repos/hooks/


Checklist
---------

- [] Create cards when issues are created
- [] Archive cards when issues are closed
- [] Un-archive cards and add to list when issues are re-opened