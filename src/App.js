import React from 'react';
import FormContainer from "./components/form-container/FormContainer";
import json2csv from "./components/json2csv/json2csv.component";
import './App.css';

class App extends React.Component {
  state = {
    json: '{"a":"A","b":"B","c":"C"}',
    csv: ''
  }

  onJSON2CSV = () => {
    this.setState({csv: json2csv(this.state.json)})
  }

  onChangeForm = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <FormContainer state={this.state} onChangeForm={this.onChangeForm} onConvertClick={this.onJSON2CSV} />
    );
  }
}

export default App;
