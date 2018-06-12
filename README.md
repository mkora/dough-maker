# Dough Maker

Node.js, Express, Mongo

## Overview

Fake data API for [Dough Tracker](https://github.com/mkora/dough-tracker)

## Notes

- Create .env file to configure db (see an example in .env.example)

- API Endpoints are described [here](https://github.com/mkora/dough-tracker#api-endpoints)

## Quick Start

1. Run the server

    - Install dependencies

      ```
      npm i
      ```

    - Boot from the top-level directory

      ```
      PORT=3030 npm start
      ```

    - Dev server (uses nodemon):

      ```
      PORT=3030 LOG_LEVEL=debug npm run dev
      ```

    - Browse at http://localhost:3030

2. Run a mock data generator:

    - Install dependencies

      ```
      npm install -g
      ```
    
    - Run a CLI tool

        ```
        # save to mock data to db
        dough-maker save

        # output mock data to a file
        dough-maker gen output ./dump.json
        ```

    - Run if `gen.js` was updated

      ```
      npm link
      ```

3. Run tests

    ```
    npm test
    ```

## Dev Notes (mock data generator)

- IMPORTANT: don't forget to add `Accept: application/json`

- Run a script (if it's not a cli tool yet):

    ```
    LOG_LEVEL=debug node gen save
    LOG_LEVEL=debug node gen output ./dump.json
    ```

- Make it a real CLI tool:

  - Add a shebang `#!/usr/bin/env node`

  - Update `package.json`

    ```
      "bin" : {
        "dough-maker" : "./gen.js"
      }
    ```

  - Make it global

    ```
    npm install -g
    ```

  - IMPORTANT: After any changes in ./gen.js don't forget to run

    ```
    npm link
    ```
