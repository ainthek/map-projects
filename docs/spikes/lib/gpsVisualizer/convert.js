// https://stackoverflow.com/questions/44021538/how-to-send-a-file-in-request-node-fetch-or-node

export { convert };

import fetch from "node-fetch";
import FormData from "form-data";
import { parseLinks } from "./parseLinks.js";
import url from "url";
const BASE = "https://www.gpsvisualizer.com";

const DEFAULTS = {
  convert_delimiter: "tab",
  units: "metric",
  convert_add_speed: 1,
  convert_add_slope: 1,
  convert_add_distance: 1,
  vmg_point: "",
  add_elevation: "",
  show_trk: 1
};
function convert(params, inputs) {

  params = Object.assign({}, DEFAULTS, params);

  const formData = new FormData();

  inputs.forEach((input, i) => {
    formData.append(`uploaded_file_${i + 1}`, input, {
      filename: `sample${i + 1}.gpx`,
      contentType: 'application/octet-stream'
    })
  })
  for (const p in params) {
    formData.append(p, params[p])
  }
  return fetch(`${BASE}/convert?output`, {
    "body": formData,
    //	
    "credentials": "include",
    "headers": {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": `$BASEconvert_input?convert_format=gpx`,
    "referrerPolicy": "no-referrer-when-downgrade",
    "method": "POST",
    "mode": "cors"
  })
    .then((response) => parseLinks(response.body))
    // he never returns more links
    //in fact all inputs are processed and returned as single result
    //e.g multitrack GPX
    .then((links) => links.map((link) => url.resolve(BASE, link)))
    .then((links) => links.map((link) => fetch(link).then(response => response.text())))
    .then((responses) => Promise.all(responses))
}

