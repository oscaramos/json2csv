import React from "react";
import ErrorModal from "../error-modal/ErrorModal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: ''};
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    this.setState({ hasError: true, error});
  }

  handleClose = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorModal open
                         handleClose={this.handleClose}
                         errormsg={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;