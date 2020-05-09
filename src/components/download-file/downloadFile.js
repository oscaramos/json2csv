import fileDownload from "js-file-download";

const downloadFile = (data, filename) => {
  fileDownload(data, filename);
}

export default downloadFile;
