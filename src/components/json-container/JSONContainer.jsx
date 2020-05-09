import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import UploadJson from "../upload-button/UploadJson";
import React from "react";
import Grid from "@material-ui/core/Grid";

const JsonContainer = ({ value, onChangeForm, onInputFile }) => (
  <Grid container spacing={2} justify='center'>
    <Grid container item xs='12' justify='center'>
      <TextareaAutosize aria-label='empty textarea' placeholder='JSON' rowsMin={20} style={{ width: '30vh' }}
                        value={value} onChange={onChangeForm} name='json' />
    </Grid>
    <Grid container item xs='12' justify='center'>
      <UploadJson onInputFile={onInputFile}/>
    </Grid>
  </Grid>
);

export default JsonContainer;