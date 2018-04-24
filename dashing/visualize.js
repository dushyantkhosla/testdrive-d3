// Add a paragraph element to the HTML page
d3.select("body")
    .append("p")
    .text("World!");

// Add an SVG circle
d3.select("body")
    .append("svg").attr("width", 50).attr("height", 50)
    .append("circle")
    .attr("cx", 25).attr("cy", 25)
    .attr("r", 25).style("fill", "purple");

/*
.select() will select the first occurrence of a DOM element

.selectAll() will select _all_ occurrences
    - if the element doesn't exist yet, it returns an empty selection, to which we can bind data using the .data() and .enter() methods.

.data() assigns elements of the data passed to it with DOM elements from the selection. If the elements don't exist yet, the .enter() method is used to create placeholders.

.enter() returns a reference for each data element to a placeholder element. Using these references, we can use append, insert or select to work with the elements.

The data bound to each element can be retrieved using the __data__ property, which we can access and modify by writing an anonymous function inside the .text() method. 

d --> refers to the current __data__ attribute 
i --> refers to the index of the current HTML element 
for the specific element being processed.
*/

// Binding Data, creating elements and accessing data
d3.select("body")
    .append("div")
    .selectAll("p")
    .data([23, 41, 57, 3])
    .enter()
    .append("p")
    .text(function(d, i){
    return "Data: " + d + ", Index: " + i;
});

// Create a blank SVG element, create a circle inside
d3.select("body")
    .append("div")
    .append("svg")
    .attr("width", 200).attr("height", 200).style("border", "1px solid black")
    .append("circle")
    .attr("cx", 100).attr("cy", 100).attr("r", 90).style("fill", "purple");

// Create concentric circles with data
d3.select("body")
    .append("div")
    .append("svg")
    .attr("width", 250).attr("height", 250).style("border", "1px solid black")
    .selectAll("circle")
    .data([100, 75, 50])
    .enter()
    .append("circle")
    .attr("cx", 125).attr("cy", 125)
    .attr("r", function (d){
    return d;
}).attr("fill", function (d, i){
    var c = ["red", "blue", "green"]
    return c[i];
})