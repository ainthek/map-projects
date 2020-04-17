import { dropbox } from "../lib/dropbox.js"
import { readFileAsString, str2dom } from "../lib/xmlReadFile.js";
import { XMLSerializer } from "../lib/DOMParser.js";
import { drawChart, drawLegend } from "../lib/chart.js";
import parseTrackPoints from "../lib/parseTrackPoints.js";

async function main() {
    document.getElementById("calculate").onclick = calculate;

    function calculate() {
        
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const reference = document.getElementById("reference");
        const shift = document.getElementById("shift");

        const inputDom = str2dom(input.value);
        const inputTrackpints = parseTrackPoints(inputDom);

        const outputDom = shiftElevation(inputDom, Number(shift.value));
        const outputTrackpints = parseTrackPoints(outputDom);
        output.value = new XMLSerializer().serializeToString(outputDom);
        const data=[{
            fileName: "original",
            trackPoints: inputTrackpints
        }, {
            fileName: `shifted ${Number(shift.value)}`,
            trackPoints: outputTrackpints
        }];
        if(reference.value){
            data.push({
                fileName: "reference", 
                trackPoints: parseTrackPoints(str2dom(reference.value))
            })
        }
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
    dropbox(document.getElementById("reference"), async function (files) {
        const file = files[0];
        const str = await readFileAsString(file);
        document.getElementById("reference").value = str;
        //calculate();
    })
}
main();