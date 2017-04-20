var firstTimeoutID = setTimeout(function () {
    console.log('First timeout, after 5 seconds');
}, 5000);

// Asserting validation of comparison between ID getter and index getter
console.assert(timeoutCollection.get(0) === timeoutCollection.getById(firstTimeoutID), 'TimeoutCollection object - index against id');

// Removing the first timeout
timeoutCollection.remove(timeoutCollection.get(0).id);