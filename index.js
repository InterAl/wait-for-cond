function waitFor(fn, timeout, message) {
    var elapsed = 0, recurStarted;

    return new Promise(function(resolve, reject) {
        function endWithRejection() {
            reject(message || 'timeout');
        }

        function continuation(result) {
            if (result) {
                return resolve();
            }

            if (elapsed > timeout) {
                return endWithRejection();
            }

            setTimeout(function () {
                elapsed += new Date() - recurStarted;
                recur();
            }, 10);
        }

        function recur() {
            recurStarted = new Date();

            const value = fn();

            if (typeof(value && value.then) === 'function') {
                Promise.race([
                    value.then(function(result) {
                        continuation(result);
                    }).catch(function() {
                        continuation(false);
                    }),
                    waitPromise(timeout - elapsed).then(function() {
                        return '###timeout###';
                    })
                ]).then(function(result) {
                    if (result === '###timeout###')
                        return endWithRejection();
                });
            } else {
                continuation(value);
            }
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
    }, timeout).catch(function (err) {
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

function waitPromise(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(timeout);
        }, timeout);
    });
}

module.exports = waitFor;
