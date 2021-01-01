import React from "react";
import TableView from "./TableView";
import AddClassWeight from "./AddClassWeight";

import "./UserClasses.css";
import "./Button.css";

export default class UserClasses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: this.props.course
        }

        this.updateGrade = this.updateGrade.bind(this);
        this.addClassWeight = this.addClassWeight.bind(this);
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.course !== prevProps.course) {
            this.setState({course: this.props.course});
        }
    }

    addClassWeight(newWeightGroup) {
        let newWeightGroups = this.state.course.weight_groups;
        newWeightGroups.push(newWeightGroup);

        console.log("New Weight Groups: " + JSON.stringify(newWeightGroups));

        let course = this.state.course;
        course.weight_groups = newWeightGroups;

        this.setState({course: course});
    }

    updateGrade (editedWeightGroup, id) {
        let weightGroups = this.state.course.weight_groups;
        weightGroups[id] = editedWeightGroup;
        console.log("PassedID: " + id);
        console.log(JSON.stringify(weightGroups[0]));

        var updatedGrade = 0;
        // compute weighted average
        for (var i = 0; i < weightGroups.length; i++) {
            let weight = 0;
            if (weightGroups[i].weight !== '')
                weight = parseInt(weightGroups[i].weight);

            updatedGrade += weightGroups[i].grade * (weight / 100);
        }

        let course = this.state.course;
        course.weight_groups = weightGroups;
        course.grade = Math.round(updatedGrade);

        this.setState({course: course});
    }

    render () {
        const thisComponent = this;

        return (
            <div id="container">
                {/* Current Course Grade Pill */}
                <h2 className="GradeDisplay">{Math.round(this.state.course.grade)}%</h2>

                <AddClassWeight addWeight={this.addClassWeight} weightGroups={this.state.course.weight_groups}/>

                {/* <button id="add_class_weight" onClick={this.addClassWeight}>Add Class Weight</button> */}

                {/* Map tables of assignments */}
                {this.state.course.weight_groups &&
                    <div className="tableViewContainer">
                        {this.state.course.weight_groups.map(weightGroup => {
                            return <TableView className="table-view" weightGroup={weightGroup} wid={weightGroup.id} key={weightGroup.id} updateTotalGrade={thisComponent.updateGrade}/>;
                        })}
                    </div>
                }
            </div>
        );
    }

}