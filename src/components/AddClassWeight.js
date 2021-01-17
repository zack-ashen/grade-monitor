import React from "react";
import ModalContainer from "./Modal/ModalContainer";
import Message from "./Message";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./AddClassWeight.css";


export default class AddClassWeight extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            newWeightGroupValue: '',
            showErrorMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.modalContainer = React.createRef();
    }

    handleChange(event) {
        this.setState({newWeightGroupValue: event.target.value});
    }

    handleSubmit (event) {
        const weightGroups = this.props.weightGroups;

        let alreadyContains = false;
        for (let i = 0; i < weightGroups.length; i++) {
            if (weightGroups[i].name === this.state.newWeightGroupValue) {
                alreadyContains = true;
                this.setState({showErrorMessage: true});
                event.preventDefault();
            }
        }

        if (!alreadyContains) {
            this.modalContainer.current.closeModal();

            const newWeightGroup = {
                name: this.state.newWeightGroupValue,
                id: weightGroups.length,
                grade: 100,
                weight: 0,
                assignments: [
                    { name: "Example Assignment",
                      points_earned: 20,
                      points_possible: 20 }
                ]
            };

            this.setState({newWeightGroupValue: ''});
            this.props.addWeight(newWeightGroup);

            event.preventDefault();
        }
    }

    closeErrorMessage () {

    }

    render() {
        return (
            <ModalContainer triggerText={'Add Weight Group'} onSubmit={this.handleSubmit} buttonStyle={"add_class_weight"} ref={this.modalContainer}>
                <div id="modal_header">
                    <h2 id="form_title">Add a Weight Group</h2>
                    <button onClick={() => this.modalContainer.current.closeModal()} id="exit_button">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <form onSubmit={this.handleSubmit} id="class_form">
                    <label>
                        <span id="input_title">Weight Group Name<br/></span>
                        <input type="text" id="class_name_input" value={this.state.newWeightGroupValue} placeholder="Ex. Quizzes" onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Finish" className="finishButton" id="submit"/>
                </form>
                {this.state.alreadyContains && 
                    <Message text={"Please use a unique name. You can't have multiple weight groups with the same name."} type={"modalError"}/>
                }
            </ModalContainer>
        );
    }
}