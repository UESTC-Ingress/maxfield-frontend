import * as CSV from 'csv-string';

function csvToObj(text) {
  var obj = [];
  var arr = CSV.parse(text);
  for (let index = 1; index < arr.length; index++) {
    if (arr[index].length > 1) {
      var obj_i = {};
      for (let i = 0; i < arr[0].length; i++) {
        const ei = arr[0][i];
        obj_i[ei.trim()] = arr[index][i].trim();
      }
      obj.push(obj_i);
    }
  }
  return obj;
}

export default csvToObj;
