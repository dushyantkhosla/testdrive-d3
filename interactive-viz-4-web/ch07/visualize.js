d3.select("body")
    .append("h1")
    .text("Ch.07 // Scales");

var i;
var points = [];
for (i = 0; i < 25; i++) {
    points[i] = [
        Math.floor(Math.random() * 600), 
        Math.floor(Math.random() * 600)
    ];
}

var w = 300;
var h = 300;

var svgCanvas = d3.select("body")
    .append("svg")
    .attr("height", h)
    .attr("width", w)
    .style("border", "1px solid black");

var Xmax = d3.max(points, function(d) {
    return d[0];
})

var Ymax = d3.max(points, function(d) {
    return d[1];
})

// Padding to avoid clipping svgs
var pdng = 20;

var xScale = d3.scaleLinear()
.domain([0, Xmax])
.range([pdng, w - pdng]);

// Reverse h so that smaller ys are pushed lower
var yScale = d3.scaleLinear()
.domain([0, Ymax])
.range([h - pdng, pdng]);

svgCanvas
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("fill", "teal")
    .attr("r", "2px")
    .attr("cx", function(d) {
    return xScale(d[0]);
}).attr("cy", function(d) {
    return yScale(d[1]);
});

