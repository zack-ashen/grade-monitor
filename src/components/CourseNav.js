import React from "react";

import "./CourseNav.css";

export default class CourseNav extends React.Component {

    render () {
        return (
            <div className="courseNavContainer">
                {this.props.classes.map(course => {
                        if (course === this.props.curClass) {
                            return (
                                <button id="course_button_active" key={course}>{course}</button>
                            );
                        } else {
                            return (
                                <button id="course_button" key={course} value={course} onClick={this.props.setCurClass}>{course}</button>
                            );
                        }
                })}
            </div>
        );
    }
}