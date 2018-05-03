# Introduction

Every HTML document is organized in a tree structure, called the **DOM tree**. One can use the *Inspector* on any browser to see this file's source. The DOM provides an API to modify its content on-the-fly. CSS Selectors are used to grab DOM elements, and D3/Javascript helps us modify these. We use SVG elements (`rect, circle, polygon, path` etc.) as building blocks for creating visualizations.  In a visualization, each entity (or data point) has a corresponding element (or graphical mark). D3 helps you maintain this mapping from data to elements.

Working with D3 requires us to simultaneously write HTML (mainly SVG), CSS and Javascript. Learning D3 is therefore  just an exercise in learning web standards and making them work together.

*Interactive visualizations* must respond to user actions. This means that we have to catch events on the page (like clicks or scrolls) and update the visualization (a group of SVG elements.) We use D3 as it allows us to 

- construct the DOM with data (each element is *bound* to a datum)
- update the DOM dynamically (whenever the data changes)

## `d3.select(), d3.selectAll()` 

A quick referesher -  We know that CSS uses *selectors* to apply style rules to DOM elements. Selectors can be simple (one) or compound (two or more) facets.

```css
/* Simple */
#foo        // <any id="foo">
foo         // <foo>
.foo        // <any class="foo">
[foo=bar]   // <any foo="bar">
foo bar     // <foo><bar></foo>

/* Compound */
foo.bar     // <foo class="bar">
foo#bar     // <foo id="bar">
```

D3 provides a nice shorthand for doing this using `select` (grabs the first instance of an element) and `selectAll` (grabs all instances of the element). The selection is returned as an **array**.

```javascript
d3.select("foo")
d3.select("foo, bar")

d3.selectAll("foo")
```

Example 1 - Creating a red SVG circle at `(20, 20)` with a radius of `10px`

```javascript
d3.selectAll("circle")
  .attr("cx", 20)
  .attr("cy", 20)
  .attr("r", 10)
  .style("fill", "red");
```

## `selection.append()`

We use the `append` method for *creating, appending and selecting* new SVG elements. Note that it returns a new selection.

Example 2 - Adding a Header element to the body element and adding some text to it.

```javascript
/* One element selected, one added */
d3.select("body")
  .append("h1")
	.text("Hello, world!");

/* Many elements selected, one added to each */
d3.selectAll("section")
	.style("background-fill", "blue")
  .append("h1")
	.text("Hello, world!");
```

## `selection.data()`

D3 accepts data in Javascript **arrays** and binds them to a selection (also an array.) This data is then used to create multiple elements (using the `.enter()` method).

Example 3 - Creating many circles

```javascript
/* Create an SVG Container, add some circles to it */
var svgContainer = 
    d3.select("body")
	.append("svg")
    .attr("height", 100)
    .attr("width", 100)
    .style("border", "2px solid black");

var points = [
  {x: 10, y: 10},
  {x: 20, y: 10},
  {x: 30, y: 20},
  {x: 50, y: 30},
  {x: 80, y: 50}
];

svgContainer.selectAll("circle")
  .data(points)
  .enter().append("circle")
    .attr("cx", function(d) {return d.x})
	.attr("cy", function(d) {return d.y})
	.attr("r", 5);
```

## `enter, update, exit`

- `enter` is used for initialization with new data, i.e. when we have no existing elements
  - when initializing, we ignore `update` and `exit`
  - the `.append` method enables us to enter (create) and update elements simultaneously so there is no code duplication
- `update` is used when we have new data that we want to *join* to an existing element.
  - when `update`-ing, we ignore `enter` and `exit`
- We call `selection.remove()` on exit, and optionally create an exit *transition* so that elements animate before removal.

# Loading external data 

Remember that data is messy - rarely in the exact format needed for visualization. JS has some useful built-in array method like `map, filter, sort …` that can be used for transformations. D3 also has some data-transformation methods like `nest, keys, values …` 

But ideally, one should use Pandas to clean/aggregate the data and then pass it on to D3.

## CSV

CSVs are untyped, so we must coerce types.

```javascript
// Sample file stocks.csv
symbol,date,price
APL,Jan 2000,1394.46
APL,Feb 2000,1366.42
APL 500,Mar 2000,1498.58

// array.forEach() is a JS method to iterate over elements
var convert_dt = d3.time.format("%b %Y")
d3.csv("stocks.csv", function(row) {
  row.forEach(function(d) {
    d.price = +d.price;
    d.date = convert_dt.parse(d.date);
  });
});
```

## JSON 

JSON is typed, but you must still parse dates.

```javascript
var convert_dt = d3.time.format("%b %Y")
d3.csv("stocks.json", function(row) {
  row.forEach(function(d) {
    d.date = convert_dt.parse(d.date);
  });
});
```

# Scales

We use the data join to map *datums to elements*, and scales for mapping from *datums to element attributes*. The position and appearance of elements are defined by their attributes, which we (1) compute from the datums and (2) scale to fit the SVG container

- Scales are functions that map from data-space to visual-space.
- Some scales can also go the other way and compute an *inverse mapping* which  is useful for interactivity.

**Domain** and **Range**

The expected values of input data (domain) are translated (scaled) into output data (domain) which are charted. We wish to obtain the attributes (position, color etc) of an element based off the data. 
Think of this as a look-up from data value (ex. `$300`) to pixels (ex. a graph co-ordinate `(25, 79)`).

>  Typically, domains are derived from data while ranges are constant.
> Methods like `d3.max(), d3.min(), d3.extent()` along with *accessor functions* help in computing domains on-the-fly.

```javascript
// Linear Scale
var linScale = 
    d3.scale.linear()
	.domain([12, 24])
	.range([0, 720]);

linScale(16); // 240

// Square Root Scale
// Useful when computing the radius of a circle from the area
var x = d3.scale.sqrt()
	.domain(d3.extent(function(d){return d}))
    .range([0, 720]);

x(16); // 268.905

// Interpolator
var x = d3.scale.linear()
    .domain([12, 24])
    .range(["steelblue", "brown"]);

x(16); // #666586

// Domain and range can have >2 values
var x = d3.scale.linear()
    .domain([-10, 0, 100])
    .range(["red", "white", "green"]);

// Ordinal scales are often used to assign categorical colors.
// http://colorbrewer2.org/
var x = d3.scale.category20()
    .domain(["A", "B", "C", "D"]);
```

# Axes

```javascript
// Create an axis for a given scale, and configure as desired.
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Render the axis by calling a <g> selection.
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
```

# SVG Coordinate System

> The origin `(0. 0)` is the **top-left** corner!

- As a consequence, we often see y-scales with an inverted range (e.g., `[height, 0]`).
- We use **transforms** to define a new origin.
  - the `.transform()` attribute on `<g>` elements lets you define a new coordinate system.

```javascript
var svg = d3.select("body").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight);

var g = svg.append("g")
    .attr("transform", "translate("
      + marginLeft + ","
      + marginTop + ")");

// Use margins for decorative elements, such as axes. 
```



# Generate Random Numbers in JS

```javascript
// Create an array of 50 random numbers under 100
var arrRandom = d3.range(50).map(x => Math.floor(Math.random() * 100))
```

