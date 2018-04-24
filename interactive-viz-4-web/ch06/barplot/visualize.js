d3.select("body")
    .append("h1")
    .text("Chapter 06 // Drawing with data")
    .style("text-align", "center");

d3.select("body")
    .append("h2")
    .text("1. Creating a Bar Chart with divs");

/* 
attr() is used to set an HTML attribute and its value on an element.
These attributes include - class, id, src, height, width, alt, style
See: https://www.w3schools.com/htmL/html_attributes.asp

Alternatively, we can use .classed("CSS class", true/false)
to apply or remove classes from elements
*/

var i;
var barData = [];
for (i = 0; i < 10; i++) {
    barData[i] = Math.ceil(Math.random() * 100)
}

d3.select("body")
    .append("div")
    .classed("barBox", true)
    .selectAll("div")
    .data(barData)
    .enter()
    .append("div")
    .classed("bar", true)
.style("height", function(d){
    return d + "px";
});

d3.select("body")
    .append("h2")
    .text("2. Drawing with SVGs");

d3.select("body").append("p").text(`
SVG is a text-based image format. Before you can draw anything, you must create an SVG element as the canvas by specifying width and height values. You can then include a number of visual elements between those svg tags, including - rect, circle, ellipse, line, text, and path.

We will now use .append() and .attr() to create SVG images
`)

var svgCanvas01 = d3
.select("body")
.append("div")
.append("svg")
.attr("width", "500px")
.attr("height", "200px")
.style("border", "1px solid black");

// Circles with data
var xs = [100, 200, 300, 400]

svgCanvas01
.selectAll("circle")
.data([25, 50, 33, 12])
.enter()
.append("circle")
.attr("cx", function(d, i){
return xs[i]
}).attr("cy", 100).attr("r", function (d){
    return d
}).attr("fill", function (d, i){
    var c = ["red", "blue", "green", "yellow"]
    return c[i];
}).attr("stroke", "black")
    .attr("stroke-width", 5);

d3.select("body").append("p").text("Remember, selectAll() will return empty references to all circles (which don’t exist yet), data() binds our data to the elements we’re about to create, enter() returns a placeholder reference to the new element, and append() finally adds a circle to the DOM.")


d3.select("body")
    .append("h2")
    .text("1. Creating a Bar Chart as an SVG image");

var h = 100;
var w = 400;

var svgCanvas_02 = d3
.select("body")
.append("div")
.append("svg")
.attr("width", w)
.attr("height", h)
.style("border", "2px solid black");

svgCanvas_02
    .selectAll("rect")
    .data(barData)
    .enter()
    .append("rect")
    .attr("class", "svgBar")
    .attr("x", function (d, i) {
    return i * 32
}).attr("y", function(d) {
    return 100 - d;
}).attr("height", function (d) {
    return d
}).text(function(d) {
    return d;
}).attr("x", function(d, i){
    return i * 32
}).attr("y", function(d) {
    return 100-d;
});









