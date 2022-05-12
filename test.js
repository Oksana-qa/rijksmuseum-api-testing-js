
const request = require('supertest')('https://www.rijksmuseum.nl/api/nl/');
const assert = require('chai').assert;

const CODE_OK = 200
const CODE_UNAUTHORIZED = 401
const TEXT_UNAUTHORIZED = 'Invalid key'

const API_KEY = '0fiuZFh4'

const INVOLVER_MAKER = 'Rembrandt van Rijn'
const ELEMENTS_NUMBER = 3608
const ART_OBJECT_NUMBER = 'SK-C-5'

const DEFAULT_NUMBER_OF_RESULTS_PER_PAGE = 10
const NUMBER_OF_RESULTS_PER_PAGE = 1
const PAGE_NUMBER = 1

describe('Rijksmuseum API `GET /collection`', () => {

    it('IF no api key THEN code IS ' + CODE_UNAUTHORIZED, () => {
		return request
			.get('/collection')
			.query(
                {   
                    involvedMaker: INVOLVER_MAKER
                })
			.expect(CODE_UNAUTHORIZED)
	});

    it('IF no api key THEN text IS ' + TEXT_UNAUTHORIZED, () => {
		return request
			.get('/collection')
			.query(
                {   
                    involvedMaker: INVOLVER_MAKER
                })
            .then((res) => {
                assert.isNotEmpty(res.text);
                assert.equal(res.text, TEXT_UNAUTHORIZED);
            });
	});

    it('IF api key THEN code IS ' + CODE_OK, () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                })
			.expect(CODE_OK);
	});

    it('IF api key AND involvedMaker IS ' + INVOLVER_MAKER + ' THEN body IS Not Empty', () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                    involvedMaker: INVOLVER_MAKER
                })
			.then((res) => {
                assert.isNotEmpty(res.body);
            });
	});

    it('IF api key AND involvedMaker IS ' + INVOLVER_MAKER + ' THEN response elements number IS ' + ELEMENTS_NUMBER, () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                    involvedMaker: INVOLVER_MAKER
                })
			.then((res) => {
                assert.equal(res.body.count, ELEMENTS_NUMBER);
            });
	});

    it('IF api key AND involvedMaker IS ' + INVOLVER_MAKER + ' THEN art objects count IS ' + DEFAULT_NUMBER_OF_RESULTS_PER_PAGE, () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                    involvedMaker: INVOLVER_MAKER
                })
			.then((res) => {
                assert.equal(res.body.artObjects.length, DEFAULT_NUMBER_OF_RESULTS_PER_PAGE);
            });
	});

    it('IF api key AND involvedMaker IS ' + INVOLVER_MAKER + ' AND page number IS ' + PAGE_NUMBER +' THEN art objects count IS ' + NUMBER_OF_RESULTS_PER_PAGE, () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                    involvedMaker: INVOLVER_MAKER,
                    ps: PAGE_NUMBER
                })
			.then((res) => {
                assert.equal(res.body.artObjects.length, NUMBER_OF_RESULTS_PER_PAGE);
            });
	});

    it('IF api key AND involvedMaker IS ' + INVOLVER_MAKER + ' THEN first art object number IS ' + ART_OBJECT_NUMBER, () => {
		return request
			.get('/collection')
			.query(
                { 
                    key: API_KEY,
                    involvedMaker: INVOLVER_MAKER,
                    ps: PAGE_NUMBER
                })
			.then((res) => {
                assert.equal(res.body.artObjects[0].objectNumber, ART_OBJECT_NUMBER);
            });
	});

});

describe('Rijksmuseum API `GET /collection/[object-number]`', () => {

    it('IF no api key THEN code IS ' + CODE_UNAUTHORIZED, () => {
		return request
			.get('/collection/' + ART_OBJECT_NUMBER)
			.expect(CODE_UNAUTHORIZED)
	});

    it('IF no api key THEN text IS ' + TEXT_UNAUTHORIZED, () => {
		return request
            .get('/collection/' + ART_OBJECT_NUMBER)
            .then((res) => {
                assert.isNotEmpty(res.text);
                assert.equal(res.text, TEXT_UNAUTHORIZED);
            });
	});

    it('IF api key THEN code IS ' + CODE_OK, () => {
		return request
            .get('/collection/' + ART_OBJECT_NUMBER)
			.query(
                { 
                    key: API_KEY,
                })
			.expect(CODE_OK);
	});

    it('IF api key THEN body IS Not Empty', () => {
		return request
            .get('/collection/' + ART_OBJECT_NUMBER)
			.query(
                { 
                    key: API_KEY,
                })
            .then((res) => {
                assert.isNotEmpty(res.body);
            });
	});

    it('IF api key AND request object number IS ' + ART_OBJECT_NUMBER + ' THEN response objectNumber IS ' + ART_OBJECT_NUMBER, () => {
		return request
            .get('/collection/' + ART_OBJECT_NUMBER)
			.query(
                { 
                    key: API_KEY,
                })
            .then((res) => {
                assert.equal(res.body.artObject.objectNumber, ART_OBJECT_NUMBER);
            });
	});

});
