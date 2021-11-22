## Description

A fun sample NestJs / React project where users can register and search available rentals in their area. Supports renters, realtors, and admin users. 

## Installation

```bash
$ npm install --silent
```

## Running the app

```bash
# development
$ npm run start:api:debug
$ npm run build:client:dev

# production mode
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Sample Data

On application start, example data is seeded into the database for use in testing out the application.
* Admin: `username: admin, password: admin`
* Realtors: `username: realtor{n}, password: realtor${n}`
  * Ex. `username: realtor3, password: realtor3`
* Clients: `username: client{n}, password: client{n}`
  * Ex. `username: client2, password: client2`


## Todo
* Add better global setup / teardown suites for e2e tests
