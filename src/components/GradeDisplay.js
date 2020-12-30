import React from 'react';

import "./GradeDisplay.css";

export default function GradeDisplay(props) {
    // console.log(props.grade);

    // const determineColor = () => {
    //     // determine background color of pill depending
    //     // on the grade
    // }

    return (
        <h2 className="GradeDisplay">{props.grade}%</h2>
    );
}