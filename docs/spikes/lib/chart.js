export { drawChart, drawLegend };

function drawChart(data, element) {

  const xDomain = d3.extent(
    data.map(({ trackPoints }) => trackPoints).flat(),
    point => point.distance.total
  );
  const yDomain = d3.extent(
    data.map(({ trackPoints }) => trackPoints).flat(),
    point => point.ele
  );
  console.log({ xDomain, yDomain });

  const chartWidth = 860;
  const chartHeight = 300;
  const chartMargins = { top: 10, right: 50, bottom: 50, left: 50 };
  const width = chartWidth - chartMargins.right - chartMargins.left;
  const height = chartHeight - chartMargins.top - chartMargins.bottom;

  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain(xDomain);

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);



  // UI
  const svg = element.append('svg')
    .attr("viewBox", [0, 0, chartWidth, chartHeight]);

  const gChart = svg.append('g')
    .attr('transform', "translate(" + chartMargins.left + "," + chartMargins.top + ")");

  // const gX = svg.append("g");
  // const gY = svg.append("g");
  // const gDot = svg.append("g");

  const gAxisX = gChart.append('g')
  const gAxisY = gChart.append('g')

  const xAxis = (g, scale) => {
    g.call(d3.axisBottom(scale))
      .attr('transform', `translate(0, ${height})`)
      .append('text')
      .attr('fill', '#333')
      .attr('y', 35)
      .attr('x', width / 2)
      .text('Distance (m)');
  }
  const yAxis = (g, scale) => {
    g.call(d3.axisLeft(scale))
      .append('text')
      .attr('fill', '#333')
      .attr('transform', 'rotate(-90)')
      .attr('y', -35)
      .attr('x', -height / 2)
      .attr('text-anchor', 'end')
      .text('Height (m)');
  }
  const gDot = gChart.append('g')
    .attr("fill", "none")
    .attr("stroke-linecap", "round");
  // draw data
  data.forEach(({ trackPoints }, i) => {
    // gDots.selectAll("dot")
    //   .data(trackPoints)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", (d) => xScale(d.distance.total))
    //   .attr("cy", (d) => yScale(d.ele))
    //   .attr("r", 1)
    //   .attr("fill", d3.schemeCategory10[i])
    gDot.selectAll("tracks")
      .data(trackPoints)
      .enter()
      .append("path")
      .attr("d", d => (console.log(d), `M${xScale(d.distance.total)},${yScale(d.ele)}h0`))
      .attr("stroke-width", 1)
      .attr("stroke", d3.schemeCategory10[i]);
  })

  // TODO: zoom 
  // https://observablehq.com/@d3/zoomable-scatterplot
  const zoom = d3.zoom()
    //.scaleExtent([0.5, 32])
    .on("zoom", zoomed);

  function zoomed() {
    const transform = d3.event.transform;
    console.log("zoomed", transform);
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    gDot.attr("transform", transform);//.attr("stroke-width", 1);;
    gAxisX.call(xAxis, zx);
    gAxisY.call(yAxis, zy);
    //gGrid.call(grid, zx, zy);
  }
  svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

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