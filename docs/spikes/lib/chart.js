export { drawChart, drawLegend };

function drawChart(data, element) {
  const chartWidth = 1000;
  const chartHeight = 400;
  var margin = { top: 20, right: 20, bottom: 20, left: 20 };
  var width = chartWidth - margin.left - margin.right;
  var height = chartHeight - margin.top - margin.bottom;


  var svg = element.append("svg")
    .attr("viewBox", [0, 0, chartWidth, chartHeight])
    .append("g")  //add group to leave margin for axis
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xDomain = d3.extent(
    data.map(({ trackPoints }) => trackPoints).flat(),
    point => point.distance.total
  );
  const yDomain = d3.extent(
    data.map(({ trackPoints }) => trackPoints).flat(),
    point => point.ele
  );

  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain(xDomain)
    .nice();

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain)
    .nice();

  var lineGroup = svg.append("g")
  var line = d3.line()
    .x(function (d) { return xScale(d.distance.total); })
    .y(function (d) { return yScale(d.ele); })
    .curve(d3.curveBasis);//default is d3.curveLinear



  data.forEach(({ trackPoints },i) => {
    var linePath = lineGroup.append("path")
      .attr("d", line(trackPoints))
      .attr("fill", "none")
      .attr("stroke",d3.schemeCategory10[i] )
      .attr("stroke-width", "1px")
  })


  //add line to svg. use path-->to know svg path
  //must add css class line, you can try to remove it and see the result




  //add x and y axis
  var yAxis = d3.axisLeft(yScale).tickSize(-width);
  var yAxisGroup = svg.append("g").call(yAxis);

  var xAxis = d3.axisBottom(xScale).tickSize(-height);/*.tickFormat("");remove tick label*/
  var xAxisGroup = svg.append("g").call(xAxis).attr("transform", "translate(0," + height + ")");
  //add zoom
  var zoom = d3.zoom()
    .scaleExtent([1, 30])// less than 1 means can resize smaller than  original size
    //.translateExtent([[-width, -height], [2 * width, 2 * height]])
    .on("zoom", zoomed);
  
    function zoomed() {
    lineGroup.selectAll("path").attr("transform", d3.event.transform);//move bar chart because we dont want to change the tick scale
    xAxisGroup.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));//rescaleX - change the xScale domain with the transforming info
    yAxisGroup.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));//rescaleY - change the yScale domain with the transforming info
  }
  element.select("svg").call(zoom);
  //svg.call(zoom).call(zoom.transform, d3.zoomIdentity);
  //add clip path to the svg

  d3.select("svg").append("defs").append("clipPath").attr("id", "clip")
    .append("rect").attr("width", width).attr("height", height);
  lineGroup.attr("clip-path", "url(#clip)");//line group is in a fixed position and the path will be moved




}
function drawLegend(data, element) {
  //create unordered list
  var legend = element
    .append("ul")
    .attr("class", "legend");

  //add list item for every category
  var legend_items = legend.selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .style("color", (d, i) => d3.schemeCategory10[i])
    .html(d => d.fileName)
}