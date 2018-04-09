# Dough Maker

Node.js, Express, Mongo

## Overview

Fake data API for Dough Tracker

## Notes

- Create .env file to configure db (see an example in .env.example)

- API Endpoints is described [here](https://github.com/mkora/dough-tracker#api-endpoints)

- Add `Accept: application/json` request header

## Quick Start

1. Install dependencies
  ```
  npm i
  ```

2. Run the server

  - Boot from the top-level directory

  ```
  PORT=3030 LOG_LEVEL=debug npm start
  ```

  - Dev server (uses nodemon):

  ```
  PORT=3030 LOG_LEVEL=debug npm run dev
  ```

  - Browse at http://localhost:3030

3. Run a mock data generator:

  If it's not a cli tool yet:

  ```
  LOG_LEVEL=debug node gen save
  LOG_LEVEL=debug node gen output ./dump.json
  ```

  Make it real CLI tool:

  - Add a shebang `#!/usr/bin/env node`

  - Update `package.json`
    ```
      "bin" : {
        "broadcast" : "./broadcast.js"
      }
  ```

  - make it global
    ```
    npm install -g
    ```

  After any changes in ./gen.js don't forget to run
  ```
  npm link
  ```


4. Run tests

  ```
  npm test
  ```
