# time-events-manager
Manage Javascript's timeouts and intervals collection

# Installation

```$ npm install time-events-manager --save```

# Usage

```typescript
// Setting some timeout
setTimeout(()=>{
    console.log('Do something');
}, 5000); 

timeoutCollection.get(0) // Will return the timeoutCollection with which you will work.
                         // Currently, the collection will consist of one timeout only
```

Basically, you should inject the library script from the place you would like the collection to work.

# Why?

JavaScript won't expose us some object or array to watch all of our current `time-events`.
This library exposes all the timeouts and intervals in your current page. In addition, it makes
it possible to manage those `time-events` in `run-time`.
