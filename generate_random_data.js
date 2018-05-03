numItems = 25;
numMax = 100;

// Create an array of random numbers
randArr = [];
d3.range(numItems).map(x => randArr.push(Math.floor(numMax * Math.random())));

// Create a random array of objects
randArrObj = [];
d3.range(numItems).map(x => randArrObj.push({val: Math.floor(numMax * Math.random()), key: x}));
