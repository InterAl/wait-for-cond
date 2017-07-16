# wait-for-cond
Wait until a condition is satisfied. Useful for testing.

# Installation
```shell
$ npm i -S wait-for-cond
```

# Usage
The promise resolves if the condition is met at least once in the specified duration, and rejects otherwise.
```javascript
var waitFor = require('wait-for-cond');

var someCondition = true;

waitFor(function() {
    return someCondition;
}, 2000, 'an optional reject message')
.then(function() {
    console.log('condition is fulfilled.');
})
.catch(function() {
    console.error('condition was not fulfilled in time.');
});
```

The condition result can also be wrapped in a promise.

```javascript
var waitFor = require('wait-for-cond');

var someCondition = true;

waitFor(function() {
    return new Promise(function(resolve) {
        return resolve(someCondition);
    });
}, 2000, 'an optional reject message')
.then(function() {
    console.log('condition is fulfilled.');
})
.catch(function() {
    console.error('condition was not fulfilled in time.');
});
```

### Eventual assertions
The promise resolves if the assertion was fulfilled at least once in the specified duration, and rejects otherwise.

```javascript
var assert = require('assert');
var waitFor = require('wait-for-cond');

var someCondition = true;

waitFor.assert(function() {
    assert(someCondition);
}, 2000)
.then(function() {
    console.log('assertion succeeded in time.');
})
.catch(function() {
    console.log('assertion did not succeed in time.');
});
```

### Eventual holding assertions 
The promise resolves if the assertion remains fulfilled for the entire specified duration, and rejects otherwise.

```javascript
var assert = require('assert');
var waitFor = require('wait-for-cond');

var someCondition = true;

waitFor.assertHold(function() {
    assert(someCondition);
}, 2000)
.then(function() {
    console.log('assertion was held for the entire duration.');
})
.catch(function() {
    console.log('assertion failed in the specified duration.');
});
```
