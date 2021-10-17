import React, { useState } from "react";
import fileDownload from "js-file-download";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ReactComponent as ClipboardIcon } from "../assets/clipboard.svg";

export function TargetToolbar({ isJsonToCsv, setJson, setCsv, csv, json }) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleCopyClipboard = () => {
    setOpenTooltip(true);
  };

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };

  const handleClear = () => {
    setJson("");
    setCsv("");
  };

  const handleDownloadFile = () => {
    if (isJsonToCsv) {
      fileDownload(csv, "json_converted.csv");
    } else {
      fileDownload(json, "csv_converted.json");
    }
  };

  const textToClipboard = () => {
    return isJsonToCsv ? csv : json;
  };

  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DeleteIcon />}
          onClick={handleClear}
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
          onClick={handleDownloadFile}
        >
          Save
        </Button>
      </Grid>

      <Grid item>
        <CopyToClipboard text={textToClipboard()} onCopy={handleCopyClipboard}>
          <Tooltip
            open={openTooltip}
            onClose={handleCloseTooltip}
            title="Copied"
            arrow
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ClipboardIcon />}
            >
              Copy
            </Button>
          </Tooltip>
        </CopyToClipboard>
      </Grid>
    </Grid>
  );
}
