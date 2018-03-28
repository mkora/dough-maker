# Sourcerer's Boilerplate

Node.js, Express, Mongo

## Overview

A boilerplate for Node.js / Express backend applications

## Notes

- Provides `mongodb` support

- Uses `morgan` as a HTTP request logger and `winston` as a logger for everything else

- Loads environment variables from `.env` file

- Uses `error-handler`

- Controllers should be added to `controllers` folder

- Linter config extends airbnb's

- Added `chai-http` to test api calls

## Quick Start

1. Make new one:

  ```
  # Clone
  git clone git@github.com:mkora/sourcerer-boilerplate.git
  cd sourcerer-boilerplate

  rm -rf .git && git init && npm init
  
  # Install dependencies
  npm i
  ```

2. Run the server

  - Boot from the top-level directory

  ```
  PORT=3030 LOG_LEVEL=debug npm start
  ```

  - Dev server (uses nodemon):

  ```
  PORT=3030 LOG_LEVEL=debug npm run devstart
  ```

  - Browse at http://localhost:3030

3. Run tests

  ```
  npm test
  ```

## API Endpoints

  Note: Use GET method to retrieve data
  
  - Call /pulse to see 'It works!'
  
    For example, `/pulse`
