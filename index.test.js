var waitFor = require('./index');
var assert = require('assert');

describe('wait for', function() {
    it('resolve when the condition is met', function() {
        var met = false;

        setTimeout(function() {
            met = true;
        }, 50);

        return waitFor(function() {
            return met;
        }, 1000);
    });

    it('reject when the timeout is reached', function() {
        var met = false;

        setTimeout(function() {
            met = true;
        }, 1000);

        return waitFor(function() {
            return met;
        }, 500).then(function() {
            throw new Error('promise was resolved, but should have been rejected.');
        }).catch(function() { });
    });

    it('reject with custom message', function() {
        var met = false;

        setTimeout(function() {
            met = true;
        }, 1000);

        return waitFor(function() {
            return met;
        }, 500, 'custom error message').then(function() {
            throw new Error('promise was resolved, but should have been rejected.');
        }).catch(function(msg) { 
            assert.equal(msg, 'custom error message');
        });
    });
});

describe('assert', () => {
    it('failure', () => {
        return waitFor.assert(function() {
            assert(false, 'failed assertion');
        }, 50).catch(function(err) {
            assert(err.message === 'failed assertion');
        });
    });

    it('success', () => {
        var met = false;

        setTimeout(function() {
            met = true;
        }, 100);

        return waitFor.assert(function() {
            assert(met, 'assertion should be met in time');
        }, 200);
    });
});
