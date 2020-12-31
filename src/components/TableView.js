import React from "react";
import AssignmentRow from "./AssignmentRow";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import "./TableView.css";

export default class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            weight: this.props.weightGroup.weight,
            assignments: this.props.weightGroup.assignments,
            grade: this.props.weightGroup.grade,
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
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.weightGroup !== prevProps.weightGroup) {
            this.setState({weight: this.props.weightGroup.weight,
                           assignments: this.props.weightGroup.assignments,
                           grade: this.props.weightGroup.grade});
        }
    }

    isNumber(event) {
        if (event.target.value.match(/^[0-9]+$/) != null || event.target.value === '') {
            return true;
        }
    }

    setWeight (event) {
        // TODO: handle if value is not a number or is greater than 100 or less than 0

        if (this.isNumber(event) && event.target.value.length < 4) {
            this.setState({weight: event.target.value});
        }
        
        const newWeightGroup = {
            name: this.props.weightGroup.name,
            grade: this.state.grade,
            assignments: this.state.assignments,
            weight: event.target.value
        }

        this.props.updateTotalGrade(newWeightGroup, this.state.id);
    }

    setNewPointsEarned(event) {
        if (this.isNumber(event)) {
            this.setState({new_points_earned: event.target.value});
        }
    }

    setNewPointsPossible(event) {
        if (this.isNumber(event)) {
            this.setState({new_points_possible: event.target.value});
        }
    }

    setNewAssignment (event) {
        this.setState({new_assignment: event.target.value});
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

        console.log(assignments);

        let totalPointsEarned = 0;
        let totalPointsPossible = 0;
        for (let i = 0; i < assignments.length; i++) {
            totalPointsEarned = totalPointsEarned + assignments[i].points_earned;
            totalPointsPossible = totalPointsPossible + assignments[i].points_possible;
        }

        console.log(totalPointsEarned + "/" + totalPointsPossible);

        let newGrade = (totalPointsEarned / totalPointsPossible) * 100;
        this.setState({assignments: assignments,
                       grade: newGrade});

        const newWeightGroup = {
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
                name: this.props.weightGroup.name,
                grade: newGrade,
                weight: this.state.weight,
                assignments: newAssignments
            }

            this.props.updateTotalGrade(newWeightGroup, this.state.id);
            
        }
    }

    setGradeColor () {

    }

    render () {
        const thisComponent = this;
        const assignments = this.state.assignments;
        return (
            <div className="TableView">
                <div id="table-top">
                    <h3 id="table-header">{this.props.weightGroup.name}</h3>
                    <button id="delete_button">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <table>
                    <tr id="header-row">
                        <th id="assignment-header">Assignment Name</th>
                        <th>Points Earned</th>
                        <th>Points Possible</th>
                        <th id="grade-header">Grade</th>
                    </tr>
                    {this.state.assignments.map(function(assignment, key) {
                        return <AssignmentRow assignment={assignment} key={key} updateWeightGrade={thisComponent.updateGrade} id={assignments.indexOf(assignment)}/>;
                    })}
                    <tr>
                        <td className="data"><input type="text" id="new-assignment-input" value={this.state.new_assignment} onChange={this.setNewAssignment}/></td>
                        <td className="data"><input type="text" id="new-points-earned-input" value={this.state.new_points_earned} onChange={this.setNewPointsEarned}/></td>
                        <td className="data"><input type="text" id="new-points-possible-input" value={this.state.new_points_possible} onChange={this.setNewPointsPossible}/></td>
                        <td className="data"><button id="add-new-assignment" onClick={this.addNewAssignment} ><FontAwesomeIcon icon={faCheckCircle} /></button></td>
                    </tr>
                </table>
                <div id="table-bottom">
                    <div id="weight-input-container">
                        <h3 id="table-footer">Weight</h3>
                        <input type="text" id="weight-input" value={this.state.weight} onChange={this.setWeight}/>
                    </div>
                    <h3 id="weight-grade">{this.state.grade}%</h3>
                </div>
            </div>
        );
    }
}