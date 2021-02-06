import React from "react";
import AssignmentRow from "./AssignmentRow";
import ModalContainer from "./Modal/ModalContainer"

import gradeColor from "../utils/gradeColor";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import "./TableView.css";

export default class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.weightGroup.id,
            weight: this.props.weightGroup.weight,
            assignments: this.props.weightGroup.assignments,
            grade: this.props.weightGroup.grade,
            name: this.props.weightGroup.name,
            new_assignment: '',
            new_points_earned: '',
            new_points_possible: '',
            new_grade: ''
        };

        this.setWeight = this.setWeight.bind(this);
        this.setNewPointsEarned = this.setNewPointsEarned.bind(this);
        this.setNewPointsPossible = this.setNewPointsPossible.bind(this);
        this.setNewAssignment = this.setNewAssignment.bind(this);
        this.updateGrade = this.updateGrade.bind(this);
        this.addNewAssignment = this.addNewAssignment.bind(this);
        this.weightOnBlur = this.weightOnBlur.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
        this.setWeightGroupName = this.setWeightGroupName.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);

        this.modalContainer = React.createRef();
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.weightGroup !== prevProps.weightGroup) {
            this.setState({id: this.props.weightGroup.id,
                           weight: this.props.weightGroup.weight,
                           assignments: this.props.weightGroup.assignments,
                           grade: this.props.weightGroup.grade,
                           name: this.props.weightGroup.name});
        }
    }

    setWeightGroupName (event) {
        this.setState({name: event.target.value});
    }

    setWeight (event) {
        const newWeight = event.target.value;

        this.setState({weight: newWeight});

        const newWeightGroup = {
            id: this.state.id,
            name: this.props.weightGroup.name,
            grade: this.state.grade,
            assignments: this.state.assignments,
            weight: newWeight
        }

        this.props.updateTotalGrade(newWeightGroup, this.state.id);
    }

    setNewPointsEarned(event) {
        this.setState({new_points_earned: event.target.value});
    }

    setNewPointsPossible(event) {
        this.setState({new_points_possible: event.target.value});
    }

    setNewAssignment (event) {
        this.setState({new_assignment: event.target.value});
    }

    deleteSelf () {
        this.modalContainer.current.closeModal();
        this.props.deleteWeightGroup(this.state.id);
    }

    /** 
     * Update weight group grade based on an edited assignment object from assignment row.
     *  Edited assignment must already be present in weight group.
     */
    updateGrade(edited_assignment) {
        let assignments = this.state.assignments;
        assignments[edited_assignment.id] = {
            name: edited_assignment.name,
            points_earned: edited_assignment.points_earned,
            points_possible: edited_assignment.points_possible
        }

        let totalPointsEarned = 0;
        let totalPointsPossible = 0;
        for (let i = 0; i < assignments.length; i++) {
            let assignPE = assignments[i].points_earned;
            let assignPP = assignments[i].points_possible;

            if (isNaN(assignPE)) assignPE = 0;
            if (isNaN(assignPP)) assignPP = 1;

            totalPointsEarned += assignPE;
            totalPointsPossible += assignPP;
        }

        let newGrade = (totalPointsEarned / totalPointsPossible) * 100;
        this.setState({assignments: assignments,
                       grade: newGrade});

        const newWeightGroup = {
            id: this.state.id,
            name: this.props.weightGroup.name,
            grade: newGrade,
            weight: this.state.weight,
            assignments: assignments
        }

        this.props.updateTotalGrade(newWeightGroup, this.state.id);
    }

    addNewAssignment() {
        if (this.state.new_assignment !== '' && this.state.new_points_earned !== '' && this.state.new_points_possible !== '') {
            let newAssignments = this.state.assignments;
            let newAssignment = {
                name: this.state.new_assignment,
                points_earned: parseInt(this.state.new_points_earned),
                points_possible: parseInt(this.state.new_points_possible)
            }
            newAssignments.push(newAssignment);

            let totalPointsEarned = 0;
            let totalPointsPossible = 0;
            for (let i = 0; i < newAssignments.length; i++) {
                totalPointsEarned += newAssignments[i].points_earned;
                totalPointsPossible += newAssignments[i].points_possible;
            }

            let newGrade = (totalPointsEarned / totalPointsPossible) * 100;
            this.setState({assignments: newAssignments,
                           grade: newGrade,
                           new_assignment: '',
                           new_points_earned: '',
                           new_points_possible: ''});
            
            const newWeightGroup = {
                id: this.state.id,
                name: this.props.weightGroup.name,
                grade: newGrade,
                weight: this.state.weight,
                assignments: newAssignments
            }

            this.props.updateTotalGrade(newWeightGroup, this.state.id);
            this.props.saveData();
        }
    }

    deleteAssignment (_, assignmentId) {
        let updatedAssignments = this.state.assignments;
        updatedAssignments.splice(assignmentId, 1);

        let totalPointsEarned = 0;
        let totalPointsPossible = 0;
        for (let i = 0; i < updatedAssignments.length; i++) {
            totalPointsEarned = totalPointsEarned + updatedAssignments[i].points_earned;
            totalPointsPossible = totalPointsPossible + updatedAssignments[i].points_possible;
        }

        let newGrade = (assignmentId > 0) ? ((totalPointsEarned / totalPointsPossible) * 100) : 0;
        this.setState({assignments: updatedAssignments,
                       grade: newGrade});

        const updatedWeightGroup = {
            id: this.state.id,
            name: this.state.name,
            grade: newGrade,
            weight: this.state.weight,
            assignments: updatedAssignments
        }

        this.props.updateTotalGrade(updatedWeightGroup, this.state.id);
        this.props.saveData();
    }

    weightNameOnBlur (event) {
        if (event.target.value === '') {
            this.setState({name: this.props.weightGroup.name});
        } else {
            const newWeightGroup = {
                id: this.state.id,
                name: this.state.name,
                grade: this.state.grade,
                weight: this.state.weight,
                assignments: this.state.assignments
            }

            this.props.updateTotalGrade(newWeightGroup, this.state.id);
            this.props.saveData();
        }
    }

    weightOnBlur (event) {
        if (event.target.value === '') {
            this.setState({weight: 0});
        }
        this.props.saveData();
    }

    render () {
        const thisComponent = this;
        const assignments = this.state.assignments;
        return (
            <div className="TableView">
                <div id="table-top">
                    {/* <h3 id="table-header">{this.props.weightGroup.name}</h3> */}
                    <input type="text" className="weightGroupName" value={this.state.name} onChange={this.setWeightGroupName}/>
                    <ModalContainer triggerText={<FontAwesomeIcon icon={faTimes}/>} buttonStyle={"delete_button"} ref={this.modalContainer}>
                        <div id="modal_header">
                            <h2 id="form_title">Are you sure?</h2>
                            <button onClick={() => this.modalContainer.current.closeModal()} id="exit_button">
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <p>Once you delete the weight group you will lose it forever. There is no going back from this decision.</p>
                        <div className="button_container">
                            <button className="deleteWeightButton" onClick={this.deleteSelf}>Delete Forever</button>
                        </div>
                    </ModalContainer>
                </div>
                <table className="weightTable">
                    <tbody>
                        <tr id="header-row">
                            <th id="assignment-header" className="assignment-field">Assignment Name</th>
                            <th className="points-earned-field">Points Earned</th>
                            <th className="points-possible-field">Points Possible</th>
                            <th id="grade-header" className="grade-field">Grade</th>
                            <th className="deleteAssignmentField"></th>
                        </tr>
                        {this.state.assignments.map(function(assignment, key) {
                            return <AssignmentRow 
                                    assignment={assignment} 
                                    key={key} 
                                    updateWeightGrade={thisComponent.updateGrade} 
                                    id={assignments.indexOf(assignment)} 
                                    saveData={thisComponent.props.saveData}
                                    deleteAssignment={thisComponent.deleteAssignment}/>;
                        })}
                        <tr>
                            <td className="data assignment-field"><input type="text" className="new-assignment-input" value={this.state.new_assignment} onChange={this.setNewAssignment}/></td>
                            <td className="data points-earned-field"><input type="number" className="new-points-earned-input" value={this.state.new_points_earned} onChange={this.setNewPointsEarned}/></td>
                            <td className="data points-possible-field"><input type="number" className="new-points-possible-input" value={this.state.new_points_possible} onChange={this.setNewPointsPossible}/></td>
                            <td className="data grade-field"><button className="add-new-assignment" onClick={this.addNewAssignment} ><FontAwesomeIcon icon={faCheckCircle} className="add-new-assignment-text" /></button></td>
                            <td className="data deleteAssignmentField"></td>
                        </tr>
                    </tbody>
                </table>
                <div id="table-bottom">
                    <div id="weight-input-container">
                        <h3 id="table-footer">Weight</h3>
                        <input type="text" className="weight-input" value={this.state.weight} onChange={this.setWeight} onBlur={this.weightOnBlur}/>
                    </div>
                    <h3 id="weight-grade" style={{backgroundColor: gradeColor(this.state.grade)}}>{Math.round(this.state.grade)}%</h3>
                </div>
            </div>
        );
    }
}