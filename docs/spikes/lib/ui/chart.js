export { drawChart, drawLegend };

function drawChart(data, element) {
  const chartWidth = 1200;
  const chartHeight = 300;
  var margin = { top: 20, right: 20, bottom: 20, left: 20 };
  var width = chartWidth - margin.left - margin.right;
  var height = chartHeight - margin.top - margin.bottom;
  /*
    structure:

    svg
      g (margins)
        chartArea (for clipping)
          lineGroup (common attributes)
          dotGroup  (common attributes)
        xAxisGroup  
        yAxisGroup
  */
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

  // top container for cliping  
  const chartArea = svg.append("g");    
  svg.append("defs").append("clipPath").attr("id", "clip").append("rect").attr("width", width).attr("height", height);
  chartArea.attr("clip-path", "url(#clip)");//line group is in a fixed position and the path will be moved

  // lines and dots group
  // will apply transfor to them when zooming
  const lineGroup=chartArea.append("g")
    .attr("stroke-width",2);
  var line = d3.line()
    .x((d) => xScale(d.distance.total))
    .y((d) => yScale(d.ele || 0))
    .curve(d3.curveLinear);//default is d3.curveLinear

  // dots
  const dotGroup = chartArea.append("g")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 5)

  // lines and dots data (both as paths)
  data.forEach(({ trackPoints }, i) => {
    lineGroup.append("path")
      .attr("d", line(trackPoints))
      .attr("fill", "none")
      .attr("stroke", d3.schemeCategory10[i])


    dotGroup.selectAll("dots")
      .data(trackPoints)
      .enter()
      .append("path")
      .attr("d", d => `M${xScale(d.distance.total)},${yScale(d.ele)}h0`)
      .attr("stroke", d3.schemeCategory10[i])
  })
  //add x and y axis
  var yAxis = d3.axisLeft(yScale).tickSize(-width);
  var yAxisGroup = svg.append("g").call(yAxis);

  var xAxis = d3.axisBottom(xScale).tickSize(-height);/*.tickFormat("");remove tick label*/
  var xAxisGroup = svg.append("g").call(xAxis).attr("transform", "translate(0," + height + ")");
  
  //add zoom
  var zoom = d3.zoom()
    .scaleExtent([1, 30])
    .on("zoom", zoomed);

  function zoomed() {
    dotGroup.attr("transform", d3.event.transform).attr("stroke-width", 5 / d3.event.transform.k);
    lineGroup.attr("transform", d3.event.transform).attr("stroke-width", 2 / d3.event.transform.k);;//move bar chart because we dont want to change the tick scale
    xAxisGroup.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));//rescaleX - change the xScale domain with the transforming info
    yAxisGroup.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));//rescaleY - change the yScale domain with the transforming info
  }
  element.select("svg").call(zoom).call(zoom.transform, d3.zoomIdentity);
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

// zooming hell
// https://bl.ocks.org/mbostock/3680957
// https://observablehq.com/@d3/zoomable-scatterplot