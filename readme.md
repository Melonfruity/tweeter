# Tweeter

A simple tweeter clone that works with a local database. The tweets can be viewed by anyone with access to the same API endpoint.

## Installation

```sh
$ npm install
```

## Dependancies
- Node.js
- md5
- express
- body-parser
- chance
- sass (WIP)

## Usage

This application allows for users to view and add text content for the web app. The tweets will rerender whenever a new tweet is added by a user.

### Limitations

1. The tweet must be between 1 to 140 characters

```sh
$ npm start
```

or 

```sh
$ npm start local
```

### Accessibility

The application is hosted by default on PORT 8080 on localhost.
- http://localhost:8080/

API endpoint for GET and POST
- http://localhost:8080/tweets

# Screenshots