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
}, 2000)
.then(function() {
    console.log('condition is fulfilled.');
})
.catch(function() {
    console.error('condition was not fulfilled in time.');
});
