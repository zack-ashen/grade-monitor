import React from "react";
import "./AssignmentRow.css";

export default class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            assignment_name: this.props.assignment.name,
            points_earned: this.props.assignment.points_earned,
            points_possible: this.props.assignment.points_possible,
            grade: (this.props.assignment.points_earned / this.props.assignment.points_possible) * 100
        }

        this.updateAssignmentName = this.updateAssignmentName.bind(this);
        this.updatePointsEarned = this.updatePointsEarned.bind(this);
        this.updatePointsPossible = this.updatePointsPossible.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.assignment !== this.props.assignment) {
            this.setState({assignment_name: this.props.assignment.name,
                           points_earned: this.props.assignment.points_earned,
                           points_possible: this.props.assignment.points_possible,
                           grade: (this.props.assignment.points_earned / this.props.assignment.points_possible) * 100});
        }
    }

    updateAssignmentName (event) {
        const newAssignmentName = event.target.value;

        this.setState({assignment_name: newAssignmentName});

        const updatedAssignment = {
            id: this.state.id,
            name: newAssignmentName,
            points_possible: this.state.points_possible,
            points_earned: this.state.points_earned
        };

        this.props.updateWeightGrade(updatedAssignment);
    }

    updatePointsEarned (event) {
        const updatedPointsEarned = parseInt(event.target.value) || 0;
        const pointsPossible = parseInt(this.state.points_possible) || 0;
        const updatedGrade = (updatedPointsEarned / pointsPossible) * 100;

        this.setState({points_earned: event.target.value,
                        grade: updatedGrade});
        
        const updatedAssignment = {
            id: this.state.id,
            name: this.state.assignment_name,
            points_possible: this.state.points_possible,
            points_earned: event.target.value
        };

        this.props.updateWeightGrade(updatedAssignment);
    }

    updatePointsPossible (event) {
        const updatedPointsPossible = parseInt(event.target.value) || 0;
        const pointsEarned = parseInt(this.state.pointsEarned) || 0;
        const updatedGrade = (pointsEarned / updatedPointsPossible) * 100;

        this.setState({points_possible: event.target.value,
                        grade: updatedGrade});

        const updatedAssignment = {
            id: this.state.id,
            name: this.state.assignment_name,
            points_possible: event.target.value,
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
                <td className="data">
                    <input 
                        type="text" 
                        className="assignment-input" 
                        value={this.state.assignment_name} 
                        onChange={this.updateAssignmentName} 
                        onBlur={this.props.saveData} />
                </td>
                <td className="data">
                    <input 
                        type="text" 
                        className="points-earned-input" 
                        value={this.state.points_earned} 
                        onChange={this.updatePointsEarned} 
                        onBlur={(e) => this.onBlur(e, 'points_earned')} />
                </td>
                <td className="data">
                    <input 
                        type="text" 
                        className="points-possible-input" 
                        value={this.state.points_possible} 
                        onChange={this.updatePointsPossible} 
                        onBlur={(e) => this.onBlur(e, 'points_possible')} />
                </td>
                <td className="data">{Math.round(this.state.grade)}%</td>
            </tr>
            </>
        )
    }
}