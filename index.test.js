var waitFor = require('./index');

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
});
