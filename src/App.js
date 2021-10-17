import React, { useEffect, useState } from "react";
import { csv2jsonAsync, json2csvAsync } from "json-2-csv";

import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Editor } from "./components/Editor";
import { SourceToolbar } from "./components/SourceToolbar";
import { TargetToolbar } from "./components/TargetToolbar";

const useStyles = makeStyles((theme) => ({
  editor: {
    width: 400,
    height: 500,
  },
  container: {
    marginTop: theme.spacing(16),
  },
  input: {
    display: "none",
  },
}));

const getJsonInternal = (json) => {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    return undefined;
  }
};

function App() {
  const classes = useStyles();
  const [isJsonToCsv, setIsJsonToCsv] = useState(true);

  const [json, setJson] = useState("");
  const [csv, setCsv] = useState("");

  const [errorOpen, setErrorOpen] = useState(false);
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    (async () => {
      try {
        if (isJsonToCsv) {
          const csv = await json2csvAsync(getJsonInternal(json));
          setCsv(csv);
        } else {
          const json = await csv2jsonAsync(csv);
          setJson(JSON.stringify(json, null, 4));
        }

        setErrorOpen(false);
      } catch (e) {
        setErrorOpen(true);
        if (json.length === 0) {
          setMessage("Input is empty");
        } else {
          setMessage("Invalid JSON");
        }
      }
    })();
  }, [json, isJsonToCsv]);

  const handleClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid
        container
        alignItems="center"
        direction={matchesSM ? "column" : "row"}
        spacing={matchesSM ? 4 : 2}
      >
        {/*----- JSON ------*/}
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item className={classes.editor}>
              <Editor
                mode="json"
                placeholder="JSON"
                onChange={(newval) => setJson(newval)}
                value={json}
                style={{ borderRadius: "5px" }}
              />
            </Grid>

            <Grid item>
              {isJsonToCsv ? (
                <SourceToolbar
                  isJsonToCsv={isJsonToCsv}
                  setJson={setJson}
                  setCsv={setCsv}
                />
              ) : (
                <TargetToolbar
                  isJsonToCsv={isJsonToCsv}
                  setJson={setJson}
                  setCsv={setCsv}
                  csv={csv}
                  json={json}
                />
              )}
            </Grid>
          </Grid>
        </Grid>

        {/*----- Reverse button ------*/}
        <Grid item>
          <Grid container alignItems="center" style={{ height: "100%" }}>
            <div>
              {isJsonToCsv ? (
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setIsJsonToCsv(false)}
                >
                  To
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setIsJsonToCsv(true)}
                >
                  To
                </Button>
              )}
            </div>
          </Grid>
        </Grid>

        {/*----- CSV ------*/}
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item className={classes.editor}>
              <Editor
                placeholder="CSV"
                value={csv}
                onChange={(newval) => setCsv(newval)}
                style={{ borderRadius: "5px" }}
              />
            </Grid>

            <Grid item>
              <Grid item>
                {!isJsonToCsv ? (
                  <SourceToolbar
                    isJsonToCsv={isJsonToCsv}
                    setJson={setJson}
                    setCsv={setCsv}
                  />
                ) : (
                  <TargetToolbar
                    isJsonToCsv={isJsonToCsv}
                    setJson={setJson}
                    setCsv={setCsv}
                    csv={csv}
                    json={json}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*----- Error message ------*/}
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          elevation={6}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
