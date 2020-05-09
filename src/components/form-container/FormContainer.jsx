import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import JsonContainer from "../json-container/JSONContainer";
import ConvertButton from "../convert-button/ConvertButton";
import CSVContainer from "../csv-container/CSVContainer";

export const FormContainer = ({ state, onChangeForm, onConvertClick, onClear, onInputFile }) => {
  return (
    <Grid container justify='center' alignItems='center' style={{ minHeight: "100vh" }}>
      <Grid item sm={12} md={10} lg={8} xl={6}>
        <Paper elevation={4} style={{ height: "50vh" }}>
          <Grid container justify='center' alignItems='center' style={{ height: "50vh" }}>
            <Grid item xs={5}>
              <JsonContainer value={state.json} onChangeForm={onChangeForm} onInputFile={onInputFile} />
            </Grid>
            <Grid container item xs={2} justify='center' alignItems='center'>
              <ConvertButton onClick={onConvertClick} />
            </Grid>
            <Grid item xs={5}>
              <CSVContainer value={state.csv} onChangeForm={onChangeForm} onClear={onClear} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>);
};

export default FormContainer;