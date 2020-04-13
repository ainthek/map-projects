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
  //clip.log({ xDomain, yDomain });

  const chartWidth = 600;
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
    .attr("viewBox", [0, 0, chartWidth, chartHeight])
    //.attr('transform', "translate(" + chartMargins.left + "," + chartMargins.top + ")");


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
    .attr("stroke-linecap", "round")
  // draw data
  data.forEach(({ trackPoints }, i) => {
    gDot.selectAll("tracks")
      .data(trackPoints)
      .enter()
      .append("path")
      .attr("d", d => `M${xScale(d.distance.total)},${yScale(d.ele)}h0`)
      .attr("stroke-width", 1)
      .attr("stroke", d3.schemeCategory10[i]);
  })

  // TODO: zoom 
  // https://observablehq.com/@d3/zoomable-scatterplot

  //https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7

  // var clip = svg.append("defs")
  //   .append("svg:clipPath")
  //   .attr("id", "clip")
  //   .append("svg:rect")
  //   .attr("width", width)
  //   .attr("height", height)
  //   .attr("x",chartMargins.left)


  //   gDot.attr("clip-path", "url(#clip)");

  const zoom = d3.zoom()
    .on("zoom", zoomed);

  function zoomed() {
    const transform = d3.event.transform;

    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    gAxisX.call(xAxis, zx);
    gAxisY.call(yAxis, zy);

    gDot.attr("transform", transform);//.attr("stroke-width", 1);;


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