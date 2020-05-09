import React from 'react';
import FormContainer from "./components/form-container/FormContainer";
import json2csv from "./components/json2csv/json2csv.component";
import './App.css';

class App extends React.Component {
  state = {
    json: JSON.stringify({ a: "A", b: "B", c: "C" }, null, 4),
    csv: '',
    error: ''
  }

  onJSON2CSV = () => {
    try {
      this.setState({ csv: json2csv(this.state.json) })
    } catch (e) {
      this.setState({ error: 'Cant convert Json2Csv' });
    }
  }

  onChangeForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClear = () => {
    this.setState({
      json: '',
      csv: ''
    });
  }

  onInputFile = (content) => {
    this.setState({ json: content });
  }

  render() {
    if (this.state.error) throw this.state.error;
    return (
      <div>
        <FormContainer state={this.state}
                       onChangeForm={this.onChangeForm}
                       onConvertClick={this.onJSON2CSV}
                       onClear={this.onClear}
                       onInputFile={this.onInputFile} />
      </div>
    );
  }
}

export default App;
