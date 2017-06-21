# wait-for-cond
##### Returns a promise that resolves when a condition is met, and rejects when a timeout is hit.

# Installation
```shell
$ npm i -S wait-for-cond
```

# Usage

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

### Support for eventual assertions

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
