import React, { useEffect, useRef, useState } from "react";
import { csv2jsonAsync, json2csvAsync } from "json-2-csv";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@material-ui/core";

import { Editor } from "./components/Editor";
import { Toolbar } from "./components/Toolbar";

import { examples } from "./examples";

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
  examplesContainer: {
    marginTop: theme.spacing(4),
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

  const [json, setJsonProtected] = useState("");
  const [csv, setCsvProtected] = useState("");

  const changeIsForConversion = useRef(false);

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const setJson = (value) => {
    setJsonProtected(value);
    changeIsForConversion.current = false;
  };

  const setCsv = (value) => {
    setCsvProtected(value);
    changeIsForConversion.current = false;
  };

  useEffect(() => {
    if (changeIsForConversion.current) return;

    (async () => {
      try {
        const csv = await json2csvAsync(getJsonInternal(json));
        setCsv(csv);
        changeIsForConversion.current = true;
      } catch (e) {}
    })();
  }, [json]);

  useEffect(() => {
    if (changeIsForConversion.current) return;

    (async () => {
      try {
        const json = JSON.stringify(await csv2jsonAsync(csv), null, 4);
        setJson(json);
        changeIsForConversion.current = true;
      } catch (e) {}
    })();
  }, [csv]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Grid
            container
            alignItems="center"
            direction={matchesSM ? "column" : "row"}
            spacing={matchesSM ? 4 : 2}
          >
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h4">JSON</Typography>
                </Grid>
                <Grid item container direction="column" spacing={1}>
                  <Grid item className={classes.editor}>
                    <Editor
                      mode="json"
                      placeholder="JSON"
                      onChange={(newJson) => {
                        setJson(newJson);
                      }}
                      value={json}
                      style={{ borderRadius: "5px" }}
                    />
                  </Grid>

                  <Grid item style={{ marginTop: 16 }}>
                    <Toolbar
                      value={json}
                      extension=".json"
                      filenameWhenDownloading="output.json"
                      onClear={() => {
                        setJson("");
                      }}
                      onReadFile={(text) => {
                        setJson(text);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h4">CSV</Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item className={classes.editor}>
                      <Editor
                        placeholder="CSV"
                        value={csv}
                        onChange={(newCsv) => {
                          setCsv(newCsv);
                        }}
                        style={{ borderRadius: "5px" }}
                      />
                    </Grid>

                    <Grid item style={{ marginTop: 16 }}>
                      <Toolbar
                        value={csv}
                        extension=".csv"
                        filenameWhenDownloading="output.csv"
                        onClear={() => {
                          setCsv("");
                        }}
                        onReadFile={(text) => {
                          const newText = text.replace(/\r/g, ""); // Removes file end-line
                          setCsv(newText);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          className={classes.examplesContainer}
        >
          <Grid item>
            <Typography variant="button">Examples</Typography>
          </Grid>
          <Grid item>
            <ButtonGroup variant="contained" color="primary">
              {examples.map((example, index) => (
                <Button onClick={() => setCsv(example)}>{index + 1}</Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
