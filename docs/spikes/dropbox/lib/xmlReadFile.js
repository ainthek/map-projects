import {xmlParseFromString} from "./xmlParseFromString.js";

export {xmlReadFile};

function xmlReadFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function() {
      console.log(this);
      const { result, error } = this;
      if (error) return reject(error);
      return xmlParseFromString(result);
    }
    reader.readAsText(file);
  });
}