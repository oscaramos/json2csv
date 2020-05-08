import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import UploadButton from "../../UploadButton";
import React from "react";
import Grid from "@material-ui/core/Grid";

const JsonContainer = props => (
  <Grid container spacing={2} justify='center'>
    <Grid container item xs='12' justify='center'>
      <TextareaAutosize aria-label='empty textarea' placeholder='JSON' rowsMin={20} style={{ width: '30vh' }}
                        value={props.value} onChange={props.onChangeForm} name='json' />
    </Grid>
    <Grid container item xs='12' justify='center'>
      <UploadButton />
    </Grid>
  </Grid>
);

export default JsonContainer;