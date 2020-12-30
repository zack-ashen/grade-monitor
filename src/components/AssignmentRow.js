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
    }

    updateAssignmentName (event) {
        this.setState({assignment_name: event.target.value});
    }

    updatePointsEarned (event) {
        var updatedPointsEarned = event.target.value;
        var updatedGrade = (event.target.value / this.state.points_possible) * 100;

        this.setState({points_earned: updatedPointsEarned,
                        grade: updatedGrade});
        
        var stateAlias = this.state;
        stateAlias.points_earned = updatedPointsEarned;
        stateAlias.grade = updatedGrade;
        this.props.updateWeightGrade(stateAlias);
    }

    updatePointsPossible (event) {
        var updatedPointsPossible = event.target.value;
        var updatedGrade = (this.state.points_earned / event.target.value) * 100;

        this.setState({points_possible: updatedPointsPossible,
                        grade: updatedGrade});

        var stateAlias = this.state;
        stateAlias.points_possible = updatedPointsPossible;
        stateAlias.grade = updatedGrade;
        
        this.props.updateWeightGrade(stateAlias);
    }

    render () {
        return (
            <>
            <tr>
                <td className="data"><input type="text" id="assignment-input" value={this.state.assignment_name} onChange={this.updateAssignmentName} /></td>
                <td className="data"><input type="text" id="points-earned-input" value={this.state.points_earned} onChange={this.updatePointsEarned} /></td>
                <td className="data"><input type="text" id="points-possible-input" value={this.state.points_possible} onChange={this.updatePointsPossible} /></td>
                <td className="data">{this.state.grade}%</td>
            </tr>
            </>
        )
    }
}