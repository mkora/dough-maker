# Dough Maker

Node.js, Express, Mongo

## Overview

Fake data API for Dough Tracker

## Notes

- Create .env file to configure db (see an example in .env.example)

- Api Endpoints is described [here](https://github.com/mkora/dough-tracker#api-endpoints)

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

  ```
  npm run gen-data
  ```

4. Run tests

  ```
  npm test
  ```
