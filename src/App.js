import React from 'react';
import FormContainer from "./components/form-container/FormContainer";
import json2csv from "./components/json2csv/json2csv.component";
import './App.css';
import ErrorModal from "./components/error-modal/ErrorModal";

class App extends React.Component {
  state = {
    json: '{"a":"A","b":"B","c":"C"}',
    csv: '',
    open: true
  }

  onJSON2CSV = () => {
    try{
      this.setState({csv: json2csv(this.state.json)})
    } catch (e) {
      this.setState({open: true});
    }
  }

  onChangeForm = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <FormContainer state={this.state} onChangeForm={this.onChangeForm} onConvertClick={this.onJSON2CSV} />
        <ErrorModal open={this.state.open} handleClose={this.handleClose} errormsg="Invalid JSON"/>
      </div>
    );
  }
}

export default App;
