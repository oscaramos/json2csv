import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UploadJson = ({ onInputFile }) => {
  let fileReader;

  const handleFileRead = () => {
    const content = fileReader.result;
    onInputFile(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <input
        type='file'
        accept='.json'
        className={classes.input}
        id='contained-button-file'
        onChange={e => handleFileChosen(e.target.files[0])}
      />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
    </div>
  );
};


export default UploadJson;