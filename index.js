function waitFor(fn, timeout, message) {
    var elapsed = 0;

    return new Promise(function(resolve, reject) {
        function recur() {
            if (fn()) {
                return resolve();
            }

            if (elapsed > timeout)
                return reject(message || 'timeout');

            setTimeout(function () {
                elapsed += 10;
                recur();
            }, 10);
        }

        recur();
    });
}

waitFor.assert = function(fn, timeout) {
    var lastError;

    return waitFor(function() {
        try {
            fn();
            return true;
        } catch (e) {
            lastError = e;
            return false;
        }
    }, timeout).catch(err => {
        return Promise.reject(lastError);
    });
};

waitFor.assertHold = function(fn, timeout) {
    var elapsed = 0;

    return new Promise(function(resolve, reject) {
        function recur() {
            try {
                fn();
            } catch (err) {
                return reject(err);
            }

            if (elapsed > timeout)
                return resolve();

            setTimeout(function () {
                elapsed += 10;
                recur();
            }, 10);
        }

        recur();
    });
};

module.exports = waitFor;
