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
        }).catch(function(err) { 
            if (err !== 'timeout')
                throw(err);
        });
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

    it('callback returns promise - wait for its completion (true)', () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(true);
            }, 50);
        });

        return waitFor(function() {
            return promise;
        }, 1000);
    });

    it('callback returns promise - wait for its completion (false)', () => {
        return waitFor(function() {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    resolve(false);
                }, 50);
            });
        }, 1000).then(function() {
            throw new Error('promise was resolved, but should have been rejected.');
        }).catch(function(err) {
            if (err.message === 'promise was resolved, but should have been rejected.')
                throw err;
        });
    });

    it('callback returns promise - the promise never returns', function() {
        return waitFor(function() {
            return new Promise((resolve, reject) => {});
        }, 1000).then(function() {
            throw new Error('promise was resolved, but should have been rejected.');
        }).catch(function(err) {
            if (err.message === 'promise was resolved, but should have been rejected.')
                throw err;
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

describe('assertHold', () => {
    it('failure - assertion fails after a while', () => {
        var met = true;

        setTimeout(function() {
            met = false;
        }, 50);

        return waitFor.assertHold(function() {
            assert(met, 'failed assertion');
        }, 2000).catch(function(err) {
            assert(err.message === 'failed assertion');
        });
    });

    it('success - assertion holds for the specified duration', () => {
        var met = true;

        return waitFor.assertHold(function() {
            assert(met, 'failed assertion');
        }, 1000);
    });
});

describe('waitFor.hold', () => {
    it('rejects when does not hold', () => {
        return waitFor.hold(function() {
            return Promise.resolve(false);
        }, 5000)
        .then(function() {
            throw 'held, but should not have';
        })
        .catch(function(err) {
            if (err === 'held, but should not have')
                throw 'failure';
        });
    });

    it('resolves when holds', () => {
        return waitFor.hold(function() {
            return Promise.resolve(true);
        }, 1000);
    });

    it('exception should reject', () => {
        return waitFor.hold(function() {
            throw 'foo';
        }, 1000).then(function() {
            throw 'should have rejected'
        }).catch(function(err) {
            if (err === 'should have rejected')
                throw err;
        });
    });
});
