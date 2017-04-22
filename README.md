# time-events-manager
View and Manage Javascript's timeout and interval collections

# Installation

```$ npm install time-events-manager --save```


# Usage

```typescript

// creating a timeout

function myFunc(){
    console.log("Hello world");
}

let myTimeoutId = setTimeout(myFunc, 5000); 

// Managing timeouts via timeoutCollection object

timeoutCollection.get(0);
timeoutCollection.getById(myTimeoutId); //Both returning the timeout object created

timeCollection.remove(myTimeoutId);
timeCollection.getAll(); // []

Basically, you should inject the library script from in place you would like the collection to work on.

# Why?

JavaScript will not expose us a simple object or array to view and manage all of our current `time-events`.
This library exposes the timeouts and intervals in your current page. In addition, it makes
it possible to manage those `time-events` in `run-time`.
