var firstTimeoutID = setTimeout(function () {
    console.log('First timeout, after 5 seconds');
}, 5000);

var secondTimeoutID = setTimeout(function () {
    console.log('second timeout, after 8 seconds');
}, 8000);

// Asserting validation of comparison between ID getter and index getter
console.assert(timeoutCollection.get(0) === timeoutCollection.getById(firstTimeoutID), 'TimeoutCollection object - index against id');

console.log(timeoutCollection.get(0)); //timeout object

// Removing the first timeout
timeoutCollection.remove(timeoutCollection.get(0).id);

console.log(timeoutCollection.getAll());

