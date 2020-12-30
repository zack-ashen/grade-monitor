import React from "react";
import AssignmentRow from "./AssignmentRow";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./TableView.css";

export default class TableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.updateGrade = this.updateGrade.bind(this);
    }

    setWeight (event) {
        // TODO: handle if value is not a number or is greater than 100 or less than 0
        this.setState({weight: event.target.value});
    }

    setNewPointsEarned(event) {
        this.setState({new_points_earned: event.target.value});
    }

    setNewPointsPossible(event) {
        this.setState({new_points_possible: event.target.value});
    }

    /** 
     * Update weight group grade based on an edited assignment object from assignment row.
     *  Edited assignment must already be present in weight group.
     */
    updateGrade(edited_assignment) {
        let assignments = this.state.assignments;
        assignments[edited_assignment.id] = {
            name: edited_assignment.assignment_name,
            points_earned: edited_assignment.points_earned,
            points_possible: edited_assignment.points_possible
        }

        let totalPointsEarned = 0;
        let totalPointsPossible = 0;
        for (var i = 0; i < assignments.length; i++) {
            totalPointsEarned += assignments[i].points_earned;
            totalPointsPossible += assignments[i].points_possible;
        }
        
        this.setState({assignments: assignments,
                       grade: (totalPointsEarned / totalPointsPossible) * 100});

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
                        <td className="data"><input type="text" id="new-assignment-input" value={this.state.new_assignment} onChange={e => {this.setState({new_assignment: e.target.value})}}/></td>
                        <td className="data"><input type="text" id="new-points-earned-input" value={this.state.new_points_earned} onChange={this.setNewPointsEarned}/></td>
                        <td className="data"><input type="text" id="new-points-possible-input" value={this.state.new_points_possible} onChange={this.setNewPointsPossible}/></td>
                        <td className="data">{this.state.new_grade}</td>
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