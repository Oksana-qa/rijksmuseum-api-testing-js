# Rijksmuseum automation API testing
[![Build Status](https://app.travis-ci.com/Oksana-qa/rijksmuseum-api-testing-js.svg?branch=main)](https://app.travis-ci.com/Oksana-qa/rijksmuseum-api-testing-js)

Functionality testing of open [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/) using SuperTest, Mocha, and Chai.
[SuperTest](https://www.npmjs.com/package/supertest) is a test framework for testing API requests.
[Mocha](https://www.npmjs.com/package/mocha) is a popular JavaScript test framework that runs on Node.js.
[Chai](https://www.npmjs.com/package/chai) is an assertion library for browser and node.js that can be paired with any JavaScript framework.

## Test Scenarious
### GET /collection
```
IF no api key THEN code IS 401
IF no api key THEN text IS 'Invalid key'
IF api key THEN code IS 200
IF api key AND involvedMaker IS Rembrandt van Rijn THEN body IS Not Empty
IF api key AND involvedMaker IS Rembrandt van Rijn THEN response elements number IS {expected_value}
IF api key AND involvedMaker IS Rembrandt van Rijn THEN art objects count IS {expected_value}
IF api key AND involvedMaker IS Rembrandt van Rijn AND page number IS {some_value} THEN art objects count IS {expected_value}
IF api key AND involvedMaker IS Rembrandt van Rijn THEN first art object number IS {expected_value}
```

### GET /collection/[object-number]
```
IF no api key THEN code IS 401
IF no api key THEN text IS 'Invalid key'
IF api key THEN code IS 200
IF api key THEN body IS Not Empty
IF api key AND request object number IS {some_value} THEN response objectNumber IS {expected_value}
```

## To run locally
```
npm install supertest mocha chai --save-dev
npm test
```

## To run on TravisCI
[TravisCI](https://www.travis-ci.com) is a continuous integration service used to build and test software projects hosted on GitHub and Bitbucket. Current project configurated to be run on TravisCI (see .travis.yml file).