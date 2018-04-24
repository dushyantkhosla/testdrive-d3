var h = 500;
var w = 500;
var points = [];
var i;

for (i = 0; i < 50; i++){
    points[i] = [
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 500)
    ]
};

// Add points
var canvas = d3
.select("body")
.append("svg")
.attr("height", h)
.attr("width", w)
.style("border", "2px solid black");

canvas
    .selectAll("circle")
    .data(points)
    .enter()
    .append("circle")
    .attr("class", "pts")
    .attr("cx", function(d){
    return d[0]
}).attr("cy", function(d){
    return d[1]
}).attr("r", "5px");

// Add labels
canvas
    .selectAll("text")
    .data(points)
    .enter()
    .append("text")
    .attr("class", "labels")
    .text(function(d) {
    return d[0] + ", " + d[1];
})
    .attr("x", function(d) { 
    return d[0] + 8;
})
    .attr("y", function(d) {
    return d[1] + 8; 
});

// Add reference lines
canvas
    .append("line")
    .attr("x1", w/2)
    .attr("y1", 0)
    .attr("x2", w/2)
    .attr("y2", h)
    .attr("stroke", "rgba(0, 0, 0, 0.2)")
    .attr("stroke-width", "2")
;

canvas
    .append("line")
    .attr("x1", 0)
    .attr("y1", h/2)
    .attr("x2", w)
    .attr("y2", h/2)
    .attr("stroke", "rgba(0, 0, 0, 0.2)")
    .attr("stroke-width", "2")
;