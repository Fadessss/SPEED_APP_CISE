import React, { Component } from "react";
import InputForm from "../components/Input/InputForm"; // Import the InputForm component
import styles from "../components/Input/inputform.module.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Input extends Component {
    render() {
        return (
            <div>
                <ToastContainer autoClose={3000} />
                <h1 className={styles.container}>Publication Submission Page</h1>
                <InputForm /> {/* Render the InputForm component here */}
            </div>
        );
    }
}

export default Input;
