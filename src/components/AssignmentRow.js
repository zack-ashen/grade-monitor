import React from "react";
import "./Button.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import "./AssignmentRow.css";

export default class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            assignment_name: this.props.assignment.name,
            points_earned: this.props.assignment.points_earned,
            points_possible: this.props.assignment.points_possible,
            grade: this.setGrade(this.props.assignment.points_earned, this.props.assignment.points_possible)
        }

        this.updateAssignmentName = this.updateAssignmentName.bind(this);
        this.updatePointsEarned = this.updatePointsEarned.bind(this);
        this.updatePointsPossible = this.updatePointsPossible.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.assignment !== this.props.assignment) {
            this.setState({id: this.props.id,
                           assignment_name: this.props.assignment.name,
                           points_earned: this.props.assignment.points_earned,
                           points_possible: this.props.assignment.points_possible,
                           grade: this.setGrade(this.props.assignment.points_earned, this.props.assignment.points_possible)});
        }
    }

    setGrade (pointsEarned, pointsPossible) {
        if (isNaN(pointsEarned)) pointsEarned = 0;
        if (isNaN(pointsPossible)) pointsPossible = 1;

        return (pointsEarned / pointsPossible) * 100;
    }

    updateAssignmentName (event) {
        let updatedAssignmentName = event.target.value;

        this.setState({assignment_name: updatedAssignmentName});

        const updatedAssignment = {
            id: this.state.id,
            name: updatedAssignmentName,
            points_possible: this.state.points_possible,
            points_earned: this.state.points_earned
        };

        this.props.updateWeightGrade(updatedAssignment);
    }

    updatePointsEarned (event) {
        const updatedPointsEarned = parseInt(event.target.value);
        const updatedGrade = this.setGrade(updatedPointsEarned, this.props.points_possible);

        this.setState({points_earned: updatedPointsEarned,
                        grade: updatedGrade});
        
        const updatedAssignment = {
            id: this.state.id,
            name: this.state.assignment_name,
            points_possible: this.state.points_possible,
            points_earned: updatedPointsEarned
        };

        this.props.updateWeightGrade(updatedAssignment);
    }

    updatePointsPossible (event) {
        const updatedPointsPossible = parseInt(event.target.value);
        const updatedGrade = this.setGrade(this.props.points_earned, updatedPointsPossible);
        this.setState({points_possible: updatedPointsPossible,
                        grade: updatedGrade});

        const updatedAssignment = {
            id: this.state.id,
            name: this.state.assignment_name,
            points_possible: updatedPointsPossible,
            points_earned: this.state.points_earned
        };
        
        this.props.updateWeightGrade(updatedAssignment);
    }

    onBlur(event, inputType) {
        if (event.target.value === '') {
            this.setState({[inputType]: 0})
        }
        this.props.saveData();
    }

    render () {
        return (
            <>
            <tr>
                <td className="data" className="assignment-field">
                    <input 
                        type="text" 
                        className="assignment-input" 
                        value={this.state.assignment_name} 
                        onChange={this.updateAssignmentName} 
                        onBlur={() => this.props.saveData()} />
                </td>
                <td className="data" className="points-earned-field">
                    <input 
                        type="number" 
                        className="points-earned-input" 
                        value={this.state.points_earned} 
                        onChange={this.updatePointsEarned} 
                        onBlur={(e) => this.onBlur(e, 'points_earned')} />
                </td>
                <td className="data" className="points-possible-field">
                    <input 
                        type="number" 
                        className="points-possible-input" 
                        value={this.state.points_possible} 
                        onChange={this.updatePointsPossible} 
                        onBlur={(e) => this.onBlur(e, 'points_possible')} />
                </td>
                <td className="data grade-field">{Math.round(this.state.grade)}%</td>
                <td className="data trashField deleteAssignmentField"><button className="deleteAssignmentButton" onClick={(e) => this.props.deleteAssignment(e, this.state.id)}><FontAwesomeIcon icon={faTrash} /></button></td>
            </tr>
            </>
        )
    }
}