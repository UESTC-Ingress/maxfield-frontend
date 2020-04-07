function downloadFile(url, file) {
  var link = document.createElement("a");
  link.href = url;
  link.download = file;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default downloadFile;
