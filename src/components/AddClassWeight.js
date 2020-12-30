import React from "react";
import ModalContainer from "./Modal/ModalContainer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default class AddClassWeight extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            newWeightGroupValue: ''
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
            if (weightGroups[i].name === this.state.newWeightGroupValue) alreadyContains = true;
        }

        if (!alreadyContains) {
            const newWeightGroup = {
                name: this.state.newWeightGroupValue,
                grade: 100,
                weight: 0,
                assignments: [
                    { name: "Example Assignment",
                      points_earned: 20,
                      points_possible: 20 }
                ]
            };

            this.props.addClassWeight(newWeightGroup);
        }

        this.setState({newWeightGroupValue: ''});
        event.preventDefault();

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
                    <input type="submit" value="Finish" className="add_class" id="submit"/>
                </form>

            </ModalContainer>
        );
    }
}