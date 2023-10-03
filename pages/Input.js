import React, { Component } from 'react';
import InputForm from '../components/Input/InputForm'; // Import the InputForm component

class Input extends Component {
  render() {
    return (
      <div>
        <h1>Publication Submission Page</h1>
        <InputForm /> {/* Render the InputForm component here */}
      </div>
    );
  }
}

export default Input;
