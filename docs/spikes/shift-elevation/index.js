import { dropbox } from "../lib/dropbox.js"
import { readFileAsString, str2dom } from "../lib/xmlReadFile.js";
import { XMLSerializer } from "../lib/DOMParser.js";
import { drawChart, drawLegend } from "../lib/chart.js";
import parseTrackpoints from "../lib/parseTrackPoints.js";

async function main() {
    document.getElementById("calculate").onclick = calculate;

    function calculate() {
        
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const shift = document.getElementById("shift");

        const inputDom = str2dom(input.value);
        const inputTrackpints = parseTrackpoints(inputDom);

        const outputDom = shiftElevation(inputDom, Number(shift.value));
        const outputTrackpints = parseTrackpoints(outputDom);
        output.value = new XMLSerializer().serializeToString(outputDom);
        const data=[{
            fileName: "original",
            trackPoints: inputTrackpints
        }, {
            fileName: `shifted ${Number(shift.value)}`,
            trackPoints: outputTrackpints
        }];
        d3.select("#chart").html("");
        d3.select("#legend").html("");
        
        drawChart(data,d3.select("#chart"));
        drawLegend(data,d3.select("#legend"));
    }
    function shiftElevation(inputDom, shift) {
        // mutating
        const elevations = inputDom.getElementsByTagName("ele");
        console.log("ele", elevations)
        for (const ele of elevations) {
            const old = ele.textContent;
            ele.textContent = Number(old) + shift;
        }
        return inputDom;
    }
    dropbox(document.getElementById("input"), async function (files) {
        const file = files[0];
        const str = await readFileAsString(file);
        document.getElementById("input").value = str;
        calculate();
    })
}
main();