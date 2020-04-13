export default drawChart;

function drawChart(data) {

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
  const chartMargins = { top: 10, right: 100, bottom: 50, left: 50 };
  const width = chartWidth - chartMargins.right - chartMargins.left;
  const height = chartHeight - chartMargins.top - chartMargins.bottom;

  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain(xDomain);

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain(yDomain);



  // UI
  const svg = d3.select('#chart').append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

  const g = svg.append('g')
    .attr('transform', "translate(" + chartMargins.left + "," + chartMargins.top + ")");

  g.append('g')
    .call(d3.axisBottom(xScale))
    .attr('transform', `translate(0, ${height})`)
    .append('text')
    .attr('fill', '#333')
    .attr('y', 35)
    .attr('x', width / 2)
    .text('Distance (m)');

  g.append('g')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('fill', '#333')
    .attr('transform', 'rotate(-90)')
    .attr('y', -35)
    .attr('x', -height / 2)
    .attr('text-anchor', 'end')
    .text('Height (m)');

  // draw data
  data.forEach(({ trackPoints }, i) => {
    g.selectAll("dot")
      .data(trackPoints)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.distance.total))
      .attr("cy", (d) => yScale(d.ele))
      .attr("r", 1)
      .attr("fill", d3.schemeCategory10[i])
  })

  //create unordered list
  var legend = d3.select("#legend")
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