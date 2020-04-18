export { drawStats };
// using d3 mainly for math
// but since already used, also for DOM building
function drawStats(data, element) {
    //console.log(JSON.stringify(data, null, 2))
    const table = element
        .append("table")
        .attr("border", "1");

    const header = table.append("thead")
        .append("tr");
    const body = table.append("tbody");
    //add list item for every category
    //header.append("th").text("data");

    header.selectAll("th")
        .data(["", ...data])
        .enter()
        .append("th")
        .style("color", (d, i) => d3.schemeCategory10[i - 1])
        .html(d => d.fileName);

    const uniqueKeys = [
        (r, { statsTrackPoints }) => (Object.keys(statsTrackPoints).forEach(k => r.add(k)), r),
        new Set()
    ];
    const keys = data.reduce(...uniqueKeys);
    const data2 = [...keys].map(k => [k, ...data.map(d => d.statsTrackPoints[k])])
    //console.log(JSON.stringify(data2, null, 2))
    // rotate 
    body.selectAll("tr")
        .data(data2)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(d => d)
        .enter()
        .append("td")
        .text(d => {
            if (Array.isArray(d) && d.length === 2 && typeof d[0] === "number") {
                return d3.format(".2f")(d[0]) + " - " + d3.format(".2f")(d[1])
            }
            return typeof d === "number" ? d3.format(".2f")(d) : d
        })


}