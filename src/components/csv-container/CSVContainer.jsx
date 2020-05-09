import React, { useState } from "react";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import IconButton from "@material-ui/core/IconButton";
import DownloadIcon from "@material-ui/icons/GetApp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import downloadFile from "../download-file/downloadFile";

const CSVContainer = ({ value, onChangeForm, onClear}) => {
  const [error, setError] = useState('');

  const onDownloadFile = (data, filename) => {
    if(data)
      downloadFile(data, filename);
    else
      setError('There are no CSV');
  };

  if(error) throw error;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify='center'>
          <TextareaAutosize aria-label='empty textarea' placeholder='CSV' rowsMin={20} style={{ width: '30vh' }}
                            value={value} onChange={onChangeForm} name='csv' />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify='center'>
          <IconButton aria-label='download' onClick={() => onDownloadFile(value, "output.csv")}>
            <DownloadIcon />
          </IconButton>

          <IconButton aria-label='copy-clipboard'>
            <FileCopyIcon />
          </IconButton>

          <IconButton aria-label='delete' onClick={onClear}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>);
};

export default CSVContainer;