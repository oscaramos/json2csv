import React from "react";
import ReactFileReader from "react-file-reader";

import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";

export function SourceToolbar({ isJsonToCsv, setJson, setCsv }) {
  const getFileTypes = () => {
    return isJsonToCsv ? [".json"] : [".csv"];
  };

  const handleReadFiles = (files) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;

      if (isJsonToCsv) {
        setJson(text);
      } else {
        // Removes file endline
        const newText = text.replace(/\r/g, "");
        setCsv(newText);
      }
    };
    reader.readAsText(files[0]);
  };

  return (
    <ReactFileReader fileTypes={getFileTypes()} handleFiles={handleReadFiles}>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        startIcon={<PublishIcon />}
      >
        Upload File
      </Button>
    </ReactFileReader>
  );
}
