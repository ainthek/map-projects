export { parsePlainTextResponse };

import XLSX from "xlsx";
const type = (t) => (r, i) => i == 0 || r.type == "T";
function parsePlainTextResponse(buffer) {
    const wb = XLSX.read(buffer, { type: "buffer" });
    return XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        .filter(type("T")); // usefull to remove subseqnet header fields also
}



