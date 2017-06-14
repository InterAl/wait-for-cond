module.exports = function waitFor(fn, timeout, message) {
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
