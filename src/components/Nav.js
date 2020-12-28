import React from "react";
import "./Nav.css";
import "./Button.css";
import Logout from "./Logout";
import ModalContainer from "./Modal/ModalContainer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { auth, db } from "../firebase";

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newClassValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.modalContainer = React.createRef();
    }

    addClass = () => {
    }

    handleChange(event) {
        this.setState({newClassValue: event.target.value});
    }

    handleSubmit(event) {
        this.modalContainer.current.closeModal();
        var userdb = db.collection('users').doc(auth.currentUser.uid);
        
        userdb.collection("classes").doc(this.state.newClassValue).set({
            name: this.state.newClassValue,
            grade: 100,
            weight_groups: {
                homework: {
                    name: "Homework",
                    grade: 100,
                    weight: 100,
                    assignments: {
                        example_assignment: {
                            name: "Example Assignment",
                            points_earned: 20,
                            points_possible: 20
                        }
                    }
                }
            }
        });

        this.props.setHasClasses();
        event.preventDefault();
    }

    render(){
        return (
            <div className="Nav">
                <h1 id="nav_header">Grade Teller</h1>
                <div id="button-container">
                    <ModalContainer triggerText={'Add Class'} onSubmit={this.handleSubmit} buttonStyle={"add_class"} ref={this.modalContainer}>
                        <div id="modal_header">
                            <h2 id="form_title">Add a Class</h2>
                            <button onClick={() => this.modalContainer.current.closeModal()} id="exit_button">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit} id="class_form">
                            <label>
                                <span id="input_title">Class Name<br/></span>
                                <input type="text" id="class_name_input" value={this.state.newClassValue} placeholder="Ex. MATH 1110" onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Finish" className="add_class" id="submit"/>
                        </form>

                    </ModalContainer>
                    <Logout />
                </div>
            </div>
        );
    }
}

