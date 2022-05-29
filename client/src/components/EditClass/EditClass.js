import React from "react";
import ModalContainer from "../Modal/ModalContainer";

import "./EditClass.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';


export default class EditClass extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            className: this.props.name,
            cachedClassName: this.props.name
        }

        this.handleChange = this.handleChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteClass = this.deleteClass.bind(this);

        this.modalContainer = React.createRef();
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.name !== prevProps.name) {
            this.setState({className: this.props.name,
                           cachedClassName: this.props.name});
        }
    }

    handleChange(event) {
        this.setState({className: event.target.value});
    }

    onBlur(event) {
        if (event.target.value === '') {
            this.setState({className: this.state.cachedClassName});
        }
    }

    handleSubmit (event) {
        this.modalContainer.current.closeModal();
        if (this.state.className !== this.state.cachedClassName) {
            this.props.editClassName(this.state.cachedClassName, this.state.className);
        }
        event.preventDefault();
    }

    deleteClass (event) {
        this.modalContainer.current.closeModal();
        this.props.deleteSelf();
        event.preventDefault();
    }

    render () {
        return (
            <ModalContainer 
                triggerText={<FontAwesomeIcon icon={faPen} />} 
                buttonStyle={"editClassButton"} 
                ref={this.modalContainer}>
                <div id="modal_header">
                    <h2 id="form_title">Edit Class</h2>
                    <button onClick={() => this.modalContainer.current.closeModal()} id="exit_button">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <span id="input_title">Class Name<br/></span>
                <input type="text" id="class_name_input" value={this.state.className} onChange={this.handleChange} onBlur={this.onBlur}/>
                <div className="submitContainer">
                    <button className="deleteWeightButton" onClick={this.deleteClass}>Delete Class</button>
                    <button className="finishButton" onClick={this.handleSubmit}>Change Name</button>
                </div>
            </ModalContainer>
        );
    }
}