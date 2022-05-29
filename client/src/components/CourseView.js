import React from "react";
import TableView from "./TableView/TableView";
import AddClassWeight from "./AddClassWeight/AddClassWeight";
import EditClass from "./EditClass/EditClass";

import gradeColor from "../utils/gradeColor";

import "./UserClasses/UserClasses.css";
import "./Button.css";

export default class UserClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.course
        }

        this.updateGrade = this.updateGrade.bind(this);
        this.addClassWeight = this.addClassWeight.bind(this);
        this.editClassName = this.editClassName.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
    }

    componentDidUpdate (prevProps) {
        if (this.props.course !== prevProps.course) {
            this.setState({course: this.props.course});
        }
    }

    addClassWeight(newWeightGroup) {
        let newWeightGroups = this.state.course.weight_groups;
        newWeightGroups.push(newWeightGroup);

        let course = this.state.course;
        course.weight_groups = newWeightGroups;

        this.setState({course: course});
    }

    updateGrade (editedWeightGroup, id) {
        let weightGroups = this.state.course.weight_groups;
        weightGroups[id] = editedWeightGroup;

        var updatedGrade = 0;
        // compute weighted average
        for (var i = 0; i < weightGroups.length; i++) {
            const weight = weightGroups[i].weight;
            const grade = weightGroups[i].grade;

            updatedGrade += grade * (weight / 100);
        }

        let course = this.state.course;
        course.weight_groups = weightGroups;
        course.grade = Math.round(updatedGrade);

        this.setState({course: course});
    }

    deleteSelf () {
        this.props.deleteClass(this.state.course);
    }

    editClassName (oldName, newName) {
        let updatedCourse = this.state.course;
        updatedCourse.name = newName;
        this.setState({course: updatedCourse});

        this.props.editClassName(oldName, newName);
    }

    render () {
        const thisComponent = this;

        return (
            <div id="container">
                {/* Current Course Grade Pill */}
                <div className="gradeDisplayContainer">
                    <div className="gradeDisplayCol"></div>
                    <div className="gradeDisplayCol"><h2 className="GradeDisplay" style={{color: gradeColor(this.state.course.grade), borderColor: gradeColor(this.state.course.grade)}}>{Math.round(this.state.course.grade)}%</h2></div>
                    <div className="gradeDisplayCol editClassContainer"><EditClass editClassName={this.props.editClassName} deleteSelf={this.deleteSelf} name={this.state.course.name} /></div>
                </div>

                <AddClassWeight addWeight={this.addClassWeight} weightGroups={this.state.course.weight_groups} />

                {/* Map tables of assignments */}
                {this.state.course.weight_groups &&
                    <div className="tableViewContainer">
                        {this.state.course.weight_groups.map(weightGroup => {
                            return <TableView 
                                    className="table-view" 
                                    weightGroup={weightGroup} 
                                    wid={weightGroup.id} 
                                    key={weightGroup.id} 
                                    saveData={this.props.saveData}
                                    deleteWeightGroup={this.props.deleteWeightGroup} 
                                    updateTotalGrade={thisComponent.updateGrade}/>;
                        })}
                    </div>
                }
            </div>
        );
    }

}