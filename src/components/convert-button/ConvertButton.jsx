import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import React from "react";

const ConvertButton = props => (
  <Button variant='contained' color='primary' endIcon={<ArrowForwardIcon />} {...props}>
    Convert
  </Button>);

export default ConvertButton;