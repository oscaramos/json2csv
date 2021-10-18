import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Grid from "@material-ui/core/Grid";
import fileDownload from "js-file-download";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import AssignmentIcon from "@material-ui/icons/Assignment";

export function Toolbar({
  value,
  extension,
  filenameWhenDownloading,
  onClear,
  onReadFile,
}) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleReadFiles = (files) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      onReadFile(text);
    };
    reader.readAsText(files[0]);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2} justifyContent="space-between">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DeleteIcon />}
            onClick={onClear}
          >
            Clear
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={() => {
              fileDownload(value, filenameWhenDownloading);
            }}
          >
            Save
          </Button>
        </Grid>

        <Grid item>
          <CopyToClipboard
            text={value}
            onCopy={() => {
              setOpenTooltip(true);
            }}
          >
            <Tooltip
              open={openTooltip}
              onClose={() => {
                setOpenTooltip(false);
              }}
              title="Copied"
              arrow
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AssignmentIcon />}
              >
                Copy
              </Button>
            </Tooltip>
          </CopyToClipboard>
        </Grid>
      </Grid>

      <Grid item>
        <ReactFileReader fileTypes={[extension]} handleFiles={handleReadFiles}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<PublishIcon />}
          >
            Upload File
          </Button>
        </ReactFileReader>
      </Grid>
    </Grid>
  );
}
